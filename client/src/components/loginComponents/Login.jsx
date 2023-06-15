import React from "react";
import * as Components from './logincomponents';

function Login() {
    const [signIn, toggle] = React.useState(true);
    return(
        <Components.Container>
            
            <Components.SignUpContainer signinIn={signIn}>

                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.input type='text' placeholder='名前'/>
                    <Components.input type='date' placeholder='生年月日'/>
                    <Components.input type='email' placeholder='メールアドレス'/>
                    <Components.input type='password' placeholder='パスワード'/>
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>

            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>

                <Components.Form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.input type='email' placeholder='メールアドレス'/>
                    <Components.input type='password' placeholder='パスワード'/>
                    <Components.Anchor href='#####'>パスワードを忘れていますか？</Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>

            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>

                <Components.Overlay signIn={signIn}>

                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>To keep connected with us please login with your personal information.</Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>Enter your personal details and start journey with us</Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>Sign Up</Components.GhostButton>
                    </Components.RightOverlayPanel>

                </Components.Overlay>

            </Components.OverlayContainer>

        </Components.Container>
    )
}

export default Login;