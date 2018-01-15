import $ from 'jquery';
import { Auth } from './Auth';

export class Container {
    static listContainerDirectory(url, filepath, callback){
        var authData = Auth.getAuthData();
        $.ajax({
            url: url + '?format=json&path=' + filepath+'&delimiter=/&prefix=',
            beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', authData.token);},
            type: "GET",
            dataType: "json",
            success: function(res){
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to delete: ' + error);
                callback(null);
            }
        });
    }
    static getContainerDetails(bucket, path, callback){
        var authData = Auth.getAuthData();
        $.ajax({
            url: "http://localhost:6543/api/v1/project/" + authData.project + '/' + bucket,
            beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', authData.token);},
            type: "GET",
            dataType: "json",
            success: function(res){
                //callback({'status': true});
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to get container details: ' + error);
                callback(null);
            }
        });
    }
    static downloadContainerFile(bucket, path, filepath, callback){
        var authData = Auth.getAuthData();
        $.ajax({
            url: "http://localhost:6543/api/v1/project/" + authData.project + '/' +bucket + '/' + filepath,
            beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', authData.token);},
            type: "GET",
            dataType: "json",
            success: function(res){
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to get tempurl: ' + error);
                callback(null);
            }
        });
    }
    static getTmpUrlForUploadContainerFile(bucket, path, filepath, callback){
        var authData = Auth.getAuthData();
        $.ajax({
            url: "http://localhost:6543/api/v1/project/" + authData.project + '/' +bucket + '/' + filepath + '?method=PUT',
            beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', authData.token);},
            type: "GET",
            dataType: "json",
            success: function(res){
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to get tempurl for upload: ' + error);
                callback(null);
            }
        });
    }
    static deleteContainerFile(url, filepath, callback){
        var authData = Auth.getAuthData();
        $.ajax({
            url: url + '/' + filepath,
            beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', authData.token);},
            type: "DELETE",
            dataType: "json",
            success: function(res){
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to delete: ' + error);
                callback(null);
            }
        });
    }
    static createDirectory(url, filepath, callback){
        var authData = Auth.getAuthData();
        var dirpath = filepath;
        if(! filepath.endsWith('/')){
            dirpath = filepath + '/';
        }
        $.ajax({
            url: url + '/' + dirpath +'?format=json',
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-Auth-Token', authData.token);
                xhr.setRequestHeader('Content-Type', 'application/directory');
            },
            type: "PUT",
            success: function(res){
                callback(res);
            },
            error: function(jqXHR, textStatus, error){
                //callback({'status': false, 'msg': error});
                console.log('Failed to add directory: ' + error);
                callback(null);
            }
        });
    }

}
