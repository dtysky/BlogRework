"""
Some useful tools.
"""


from os.path import splitext


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