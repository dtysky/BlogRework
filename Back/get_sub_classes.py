"""
Getting all sub classes.
"""

import os


def get_all_classes(files, parent_class):
    """
    Return a list contents all classes
    """
    def is_class(d):
        return type(d) == type(parent_class)
    def is_sub_of_parent(d):
        return issubclass(d, parent_class) and d != parent_class

    modules = []
    classes = []

    #Import all modules from TagSorce dir
    for f in files:
        n, e = os.path.splitext(f)
        if e == '.py':
            modules.append(__import__(n))

    #Get all classes which are children of Path
    for m in modules:
        for d in dir(m):
            d = getattr(m, d)
            if is_class(d) and is_sub_of_parent(d):
                classes.append(d)
    return classes