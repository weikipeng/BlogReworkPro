/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/21
 * Description:
 */

import request from 'superagent';
import actionTypes from '../actions';

import config from '../../config';

const serverUrl = config.serverUrl;

export function getListSource(type: string, name: string, currentLists: Object) {
    let url = `${serverUrl}/${type}`;
    if (name) {
        url = `${url}/${name}`;
    } else {
        url = `${url}/all`;
    }

    return dispatch => {
        if (currentLists.has(name)) {
            const list = currentLists.get(name);
            dispatch({type: actionTypes.get[type].successful, name, list});
            return Promise.resolve();
        }

        dispatch({type: actionTypes.get[type].waiting});
        return request.get(url)
            .timeout(config.timeout)
            .then(res => {
                const list = res.body.content || [];
                dispatch({type: actionTypes.get[type].successful, name, list});
                return Promise.resolve(res);
            })
            .catch(err => {
                if (config.devMode) {
                    console.log(err); // eslint-disable-line
                }
                dispatch({type: actionTypes.get[type].failed, name});
                return Promise.reject(err);
            });
    };
}

export function getArticleSource(name: string, currentArticles: Object) {
    const url = `${serverUrl}/article/${name}`;

    return dispatch => {
        if (currentArticles.has(name)) {
            dispatch({type: actionTypes.get.article.successful, name});
            return Promise.resolve();
        }

        dispatch({type: actionTypes.get.article.waiting});
        return request.get(url)
            .timeout(config.timeout)
            .then(res => {
                const article = res.body.content || {};
                dispatch({type: actionTypes.get.article.successful, name, article});
                return Promise.resolve(res);
            })
            .catch(err => {
                if (config.devMode) {
                    console.log(err); // eslint-disable-line
                }
                dispatch({type: actionTypes.get.article.failed, name});
                return Promise.reject(err);
            });
    };
}

export function initMusic(DefaultList) {
    const url = '/music.json';

    return dispatch => {
        if (!DefaultList.isEmpty()) {
            return Promise.resolve();
        }

        return request.get(url)
            .timeout(config.timeout)
            .then(res => {
                const music = res.body || [];
                dispatch({type: actionTypes.init.music.successful, music});
                return Promise.resolve(res);
            })
            .catch(err => {
                if (config.devMode) {
                    console.log(err); // eslint-disable-line
                }
                dispatch({type: actionTypes.init.music.failed});
                return Promise.reject(err);
            });
    };
}
