import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // 구글 로그인 페이지로 리다이렉션 할 api
    @Get('/google')
    @ApiOperation({ summary: '구글 로그인', description: '구글 로그인' })
    @ApiCreatedResponse({ description: '구글 로그인'})
    @UseGuards(AuthGuard('google')) // AuthGuard에 google 전달하면 Strategy 작성 시 작성한 명칭 찾아서 적용한다
    async googleAuth(@Req() req) {

    }

    // 구글 로그인 후 콜백 url로 오는 요청 처리하는 api
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) { // req.user로 유저 프로필 값 가져옴
        return this.authService.googleLogin(req);
    }

    // 네이버 로그인
    @Get('/naver')
    @ApiOperation({ summary: '네이버 로그인', description: '네이버 로그인' })
    @ApiCreatedResponse({ description: '네이버 로그인'})
    @UseGuards(AuthGuard('naver')) // AuthGuard에 naver 전달하면 Strategy 작성 시 작성한 명칭 찾아서 적용한다
    async naverAuth(@Req() req) {

    }

    // 네이버 로그인 후 콜백 url로 오는 요청 처리하는 api
    @Get('naver/callback')
    @UseGuards(AuthGuard('naver'))
    naverAuthRedirect(@Req() req) { // req.user로 유저 프로필 값 가져옴
        return this.authService.naverLogin(req);
    }

    // 카카오 로그인
    @Get('/kakao')
    @ApiOperation({ summary: '카카오 로그인', description: '카카오 로그인' })
    @ApiCreatedResponse({ description: '카카오 로그인'})
    @UseGuards(AuthGuard('kakao')) // AuthGuard에 kakao 전달하면 Strategy 작성 시 작성한 명칭 찾아서 적용한다
    async kakaoAuth(@Req() req) {

    }

    // 카카오 로그인 후 콜백 url로 오는 요청 처리하는 api
    @Get('kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    kakaoAuthRedirect(@Req() req) { // req.user로 유저 프로필 값 가져옴
        return this.authService.kakaoLogin(req);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('profile')
    // getProfile(@Req() req) {
    //     return req.user;
    // }
}