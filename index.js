const express = require('express');
const dotenv = require('dotenv');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

/**
 * Add your agora app id and certificate
 */
const AGORA_APP_ID = ''
const AGORA_APP_CERTIFICATE = ''

const PORT = '3333'
const AGORA_TOKEN_EXPIRATION = 60

const generateToken = (
  uid = 'unique-user-id',
  channelName = 'test-channel',
) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  return RtcTokenBuilder.buildTokenWithAccount(
    AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    currentTimestamp + AGORA_TOKEN_EXPIRATION,
  );
};

const handleToken = (req, resp) => {
  const token = generateToken()

  return resp.json({ 'token': token });
}

const app = express();

app.get('/token', handleToken)
app.use('/index.html', express.static(__dirname + '/index.html'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));