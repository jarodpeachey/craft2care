'use strict';

let request = require('request');

// populate environment variables locally.
require('dotenv').config();

/*
  Our serverless function handler
*/
export function handler(event, context, callback) {
  // get the arguments from the notification
  let body = JSON.parse(event.body);

  // prepare call to the Slack API
  let slackURL = process.env.SLACK_WEBHOOK_URL;
  let slackPayload = {
    text: 'New comment on ' + process.env.URL,
    attachments: [
      {
        fallback: 'New comment on the comment example site',
        color: '#444',
        author_name: body.data.email,
        title: body.data.path,
        title_link: process.env.URL + body.data.path,
        text: body.data.comment,
      },
      {
        fallback: 'Manage comments on ' + process.env.URL,
        callback_id: 'comment-action',
        actions: [
          {
            type: 'button',
            text: 'Approve comment',
            name: 'approve',
            value: body.id,
          },
          {
            type: 'button',
            style: 'danger',
            text: 'Delete comment',
            name: 'delete',
            value: body.id,
          },
        ],
      },
    ],
  };

  // post the notification to Slack
  request.post({ url: slackURL, json: slackPayload }, function(
    err,
    httpResponse,
    body,
  ) {
    let msg;
    if (err) {
      msg = 'Post to Slack failed:' + err;
    } else {
      msg = 'Post to Slack successful!  Server responded with:' + body;
    }
    callback(null, {
      statusCode: 200,
      body: msg,
    });
    return console.log(msg);
  });
}
