/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        console.log('READY');
        // ON INIT
        // weird test info collector without console.log outside of angular
        window.tests = [];
        window.tests.push('INITIALIZED');

        // REGISTER IN GCM
        var push = PushNotification.init({
            android: {
                //only digits!!!
                //senderID: "digger-159520"
                senderID: "89210954243"
            },
            // optional if you use some server for pushes
            //browser: {
            //  pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            //},
            //ios: {
            //  alert: "true",
            //  badge: "true",
            //  sound: "true"
            //},
            windows: {}
        });

        push.on('registration', function(data) {
            // data.registrationId
            window.tests.push(data);
            window.tests.push(data.registrationId);
            // GOT it !!!
            // gYevhI_AEk:APA91bFnwlEcDBjK7PvhAecmTq1ZFimstg5vuOrXlmbQaltlvNJQwnQXBF_xNtbxkrLuVWGhNYky-lmqBJ-4-I9Ad6qET12E2CFdQOfUm7YET-jRFueSHgEttyCi3Q_TVU8KDow8a2jH
        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            window.tests.push(data);

            // very unpredictable how it converted after click on ntfc and works here with another data variables
            // https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md
            // TODO - this very important - how backend sends data, related data described with details on back and states
            navigator.notification.alert(
                    data.message,         // message
                    null,                 // callback
                    data.title,           // title
                    'Ok'                  // buttonName
            );

        });

        push.on('error', function(e) {
            // e.message
            window.tests.push(e.message);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
