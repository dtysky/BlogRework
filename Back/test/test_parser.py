import os
os.path.join(os.path.dirname(__file__), "../")

from parser import Parser

if __name__ == "__main__":
    parser = Parser()
    for k, v in parser.parse("pages/skill/test.md").items():
        print k, ":", v