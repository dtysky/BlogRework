import os
os.path.join(os.path.dirname(__file__), "../")


from pymongo import MongoClient
from web_server import WebServer

if __name__ == "__main__":
    client = MongoClient()
    database = client.get_database("test")
    client.close()
    server = WebServer(database).web_server
    server.run(debug=True)