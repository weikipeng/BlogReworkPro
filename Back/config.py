# T_T coding=utf-8 T_T

"""
Settings.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "Config"

import os


config_dev = {
    "is_linux": False,
    "server_ip": "127.0.0.1",
    "server_port": 4444,
    "database_name": "test",
    "sitemap_path": "test/sitemap.xml",
    "feeds_dir_path": "test/feeds",
    "feeds_slug": "test/feeds",
    "content_path": "test/pages",
    "log_path": "test/logs"
}

config_pd = {
    "is_linux": True,
    "server_ip": "127.0.0.1",
    "server_port": 4444,
    "database_name": "test",
    "sitemap_path": "sitemap.xml",
    "feeds_dir_path": "feeds",
    "feeds_slug": "feeds",
    "content_path": "pages",
    "log_path": "logs"
}

config = {
    "default_authors": ["dtysky"],
    "site_url": "http://dtysky.moe",
    "site_title": "dtysky|一个行者的轨迹",
    "site_description": "自由地看待世界，真诚地走向死亡",
    "sitemap_freq": "daily",
    "sitemap_priority": 0.5,
    "articles_per_page": 10,
    "env": os.environ["PYTHON_ENV"]
}

config.update(config_dev if os.environ["PYTHON_ENV"] == "development" else config_pd)