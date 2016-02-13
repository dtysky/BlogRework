# T_T coding=utf-8 T_T

"""
A monitor for listening the event while file changes.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "FileMonitor"


from watchdog.events import FileSystemEventHandler


class FileMonitor(FileSystemEventHandler):
    """
    A monitor for listening the event while file changes.
    """

    def on_moved(self, event):
        pass

    def on_created(self, event):
        pass

    def on_deleted(self, event):
        pass

    def on_modified(self, event):
        pass