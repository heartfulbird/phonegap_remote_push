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
                senderID: "159520"
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
            // egYevhI_AEk:APA91bEYiTB1Z3LGMDTMxbPRrPkt0evNAT5MXeuKZjEXsxTa1YqoAlLNEg9HPVV-Owdb7AVFiIxriDAxQFeyOMWl-kxjDIoOl2flbfNfbhEHHC4XEoyc0HLGHKDTpURFJxA-OSBUWLQ-
        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            window.tests.push(data);
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
