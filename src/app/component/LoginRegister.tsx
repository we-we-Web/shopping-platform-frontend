import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

interface LoginPopupProps {
    onClose: () => void;
}
function LoginRegister({ onClose }: LoginPopupProps) {
    const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        onClose();
        try {
            const response = await fetch('/api/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

            if (response.ok) {
                console.log('Login successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="242403448980-4japuuckr49kb7flht7t2sgiiqq4ffoe.apps.googleusercontent.com">
            <div className="flex flex-col items-center justify-center">
                <div className="mt-4">
                    <div className="flex gap-2">
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginRegister;