"""
Some useful tools.
"""

def convert_to_underline(name):
    """
    Convert upper camel case to underline.
    """
    s = name
    tmp = ""
    for _s_ in s:
        tmp += _s_ if _s_.islower() else "_" + _s_.lower()
    return tmp[1:]