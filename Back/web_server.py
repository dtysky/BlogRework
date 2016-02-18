# T_T coding=utf-8 T_T

"""
Web server for http requests.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "WebServer"


from flask import Flask
from web_handlers import WebHandler
from get_sub_classes import get_all_classes
from utils import logger


class WebServer(object):
    """
    Web router for http requests.
    """

    def __init__(self, database):
        self._web_handlers = {}
        for c in get_all_classes(["web_handlers.py"], WebHandler):
            obj = c(database)
            self._web_handlers[obj.url] = obj
        self._web_server = Flask("web_server")
        self._register(database)

    def _register(self, database):
        logger.info("Handlers register start !")
        for handler_name, handler_obj in self._web_handlers.items():
            self._web_server.add_url_rule(
                "/%s/<string:parameters>" % handler_name,
                view_func=handler_obj.as_view(handler_name, database)
            )
            logger.info("Handler register: '%s'" % handler_name)
        logger.info("Handlers register done !")

    @property
    def web_server(self):
        return self._web_server