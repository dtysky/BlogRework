"""
Some useful tools.
"""


from os.path import splitext
from datetime import datetime
from setting import setting


def convert_to_underline(name):
    """
    Convert upper camel case to underline.
    """
    s = name
    tmp = ""
    for _s_ in s:
        tmp += _s_ if _s_.islower() else "_" + _s_.lower()
    return tmp[1:]


def print_database(database):
    """
    Print all items in database.
    """
    collection_names = database.collection_names()
    collection_names.remove("system.indexes")
    for name in collection_names:
        collection = database.get_collection(name)
        print name, ":"
        for item in collection.find({}):
            print item


def clear_database(database):
    """
    Clear database.
    """
    collection_names = database.collection_names()
    collection_names.remove("system.indexes")
    for name in collection_names:
        collection = database.get_collection(name)
        collection.delete_many({})


def is_markdown_file(file_path):
    return splitext(file_path)[1] == ".md"


class Logger(object):
    """
    A monitor for printing and storing server state.
    """

    def __init__(self, log_dir_path):
        self._log_dir_path = log_dir_path
        self._time = ""
        self._file = None
        self._new_with_check()

    def _new_with_check(self):
        now = datetime.now().strftime("%Y-%m-%d")
        if now != self._time:
            self._time = now
            if self._file:
                self._file.close()
            self._file = open(
                "%s/%s.log" %
                (self._log_dir_path, now),
                "w"
            )

    def _log(self, message, color):
        self._new_with_check()
        line = "%s: %s\n" % (
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            message
        )
        print "%s%s" % (color, line)
        self._file.write(line)

    def info(self, message):
        self._log(
            "Info: %s" % message,
            "\033[0m"
        )

    def error(self, message):
        self._log(
            "Error: %s" % message,
            "\033[1;31;0m"
        )

# Singleton
logger = Logger(setting["log_path"])