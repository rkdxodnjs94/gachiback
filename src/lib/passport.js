const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  	// 페이스북 Strategy
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID, // ClientID
        clientSecret: process.env.FACEBOOK_SECRET, // ClientSecret
        callbackURL: process.env.SERVER_HOST + '/api/auth/login/facebook/callback', // 콜백URL
        profileFields: ['id', 'email', 'displayName'] // 가져오고싶은 필드 설정
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile); // 로그인 성공
    }));
}