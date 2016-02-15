# T_T coding=utf-8 T_T

"""
Main function.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "__main__"


from pymongo import MongoClient
from watchdog.observers import Observer
from file_monitor import FileMonitor
from web_server import WebServer
from setting import setting

if __name__ == "__main__":
    client = MongoClient()
    database = client.get_database("test")
    client.close()
    server = WebServer(database).web_server
    observer = Observer()
    file_monitor = FileMonitor(
        database,
        setting["content_path"]
    )
    observer.schedule(
        file_monitor,
        path=setting["content_path"],
        recursive=True
    )
    observer.start()
    server.run(
        setting["server_ip"],
        setting["server_port"]
    )