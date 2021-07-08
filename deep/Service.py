'''
File    : Service.py
Author  : Aiden
Project : Hopkins
Url     : https://gitee.com/intellen/network
'''
import socketserver
import struct
import ast

__version__ = '1.0.5'

class Node:
    '''
    Save infomation of a connection

        account(str)  : The only id of this connection
        addr(tuple)   : IP(str) and port(int)
        conn(object)  : Handler.request
    '''
    def __init__(self, account, addr, conn):
        self.account = account
        self.addr = addr
        self.conn = conn

class Connector:
    '''Manage the nodes'''
    def __init__(self):
        self.__list = []
    
    def listall(self) -> list:
        ''' Return all the nodes' account '''
        results = []
        for node in self.__list:
            results.append(node.account)
        return results
    
    def search(self, account) -> tuple:
        '''
        Search node you want by account

            account(str) : The id of node you wanna get
        '''
        for node in self.__list:
            if node.account == account:
                return True, node
        return False, None
    
    def add(self, node) -> bool:
        '''
        Add a new node which there have not the same account

            node(object) : Node(account, password, conn)
        '''
        iden = self.search(node.account)[0]
        # Check if there is a same node
        if iden != False:return False
        self.__list.append(node)
        return True
    
    def remove(self, account) -> bool:
        '''
        Delete a node which there have

            account(str)  : The id of node you wanna delete
        '''
        node = self.search(account)
        # Check if here have node you can delete
        if not node[1]:return False
        self.__list.remove(node[1])
        return True

connector = Connector()
class CoreTree(socketserver.BaseRequestHandler):
    def setup(self):
        # Set up data
        super().setup()
        # Connect here should send a code which is this so that can continue
        self.conpwd = 'sf5dfe146'
    
    def Recv(self):
        conn = self.request
        length = struct.unpack('i',conn.recv(4))[0]
        data = ''
        while length > 1024:
            data += conn.recv(1024).decode('utf-8')
            length -= 1024
        data += conn.recv(length).decode('utf-8')
        return data

    def Send(self, data, conn=None):
        if not conn:
            conn = self.request
        length = len(data)
        header = struct.pack('i', length)
        conn.send(header)
        conn.send(data)

    def sign(self):
        # When another node connect here
        global connector
        conn = self.request
        while True:
            try:data = self.Recv()
            except:return False
            # Check connection and data
            if not data:continue
            else:break
        try:data = ast.literal_eval(data)
        except:return  False
        # Check data type
        if type(data) != dict:return False
        code = data.get('code')
        account = data.get('account')
        # Check registration information
        if code != self.conpwd and account == '':return False
        same = connector.search(account)
        if same[0] == True:return False
        # Save the infomation
        self.node = Node(account, self.client_address, conn)
        connector.add(self.node)
        print(account, self.client_address, conn)
        return True

    def forward(self, data):
        # Forward information to another node or group
        global connector
        conn = self.request
        # Get target account
        account = data.pop('to')
        if account[0] == '[' and account[-1] == ']':
            try:account = ast.literal_eval(account)
            except:self.returninfo('500')
        else:
            to = []
            to.append(account)
            account = to
        # Check alive
        Alive = []
        for acc in account:
            stu, node = connector.search(acc)
            if stu == True:
                Alive.append(node)
        if Alive == []:
            self.returninfo('404')
            return
        # Add 'from' data
        data.setdefault('from',self.node.account)
        if len(account) > 1:
            account.append(self.node.account)
            data.setdefault('group',account)
        # Send to
        data = str(data).encode('utf-8')
        for node in Alive:
            try:self.Send(data, node.conn)
            except:pass
        return True
    
    def command(self, data):
        global connector
        cmd = data.get('cmd')
        if cmd == 'alive':
            Alive = connector.listall()
            self.returninfo(str(Alive))
            return

    def returninfo(self, info):
        self.Send(info.encode('utf-8'))

    def handle(self):
        global connector
        if self.sign() == False:self.returninfo('401')
        else:
            conn = self.request
            while True:
                try:data = self.Recv()
                except:break
                try:data = ast.literal_eval(data)
                except:
                    self.returninfo('DataError')
                    continue
                if 'to' in data:
                    self.forward(data)
                    continue
                if 'cmd' in data:
                    self.command(data)
                    continue
            connector.remove(self.node.account)

if __name__ == '__main__':
    addr = ('0.0.0.0',1305)
    server = socketserver.ThreadingTCPServer(addr,CoreTree)
    server.serve_forever()