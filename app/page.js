'use client';
import { useRouter } from 'next/navigation';
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import './styles.css';

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const handleLogin = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleGoToMain = () => {
    router.push('/main');
  };

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <div className="typing-container">
          <h1 style={titleStyle}>
            <span className="typing-text">CapSize</span>
          </h1>
        </div>
        <p style={rightSideTextStyle}>
          Welcome to <span style={{ color: '#ccb2d3' }}>CapSize</span> – the ultimate caption generator tailored to your needs!
          Whether you're posting on Instagram, Twitter, or any other platform, we help you craft the perfect caption in seconds.
          Just choose your tone — be it fun, professional, or something in between — and watch as our AI-powered tool, <span style={{ color: '#ccb2d3' }}>CapSize</span>,
          delivers the right words for you. Elevate your social media game effortlessly with personalized
          captions that resonate with your style and platform.
        </p>
        <SignedIn>
          <button style={startButtonStyle} onClick={handleGoToMain}>START HERE</button>
        </SignedIn>
      </div>
      <div style={rightSideStyle}>
        <div style={centerBoxStyle}>
          <h2 style={CapSizeStyle}>CapSize</h2>
          <p style={subtitleStyle}>Your Words, Our Style, Perfectly Matched!</p>
          <div style={buttonGroupStyle}>
            <SignedOut>
              <button style={{ ...buttonStyle, backgroundColor: 'white', color: '#426c36', fontSize: '1.1rem' }} onClick={handleLogin}>Log In</button>
              <button style={{ ...buttonStyle, backgroundColor: '#d9d9d9', color: '#426c36' }} onClick={handleSignUp}>Sign Up</button>
            </SignedOut>
            <SignedIn>
              <UserButton />
              {isSignedIn && user && (
                <>
                  <div style={messageBubbleStyle}>
                    <p style={welcomeMessageStyle}>Welcome, {user.firstName} to CapSize</p>
                  </div>
                </>
              )}
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#426c36',  
  padding: '0 50px',
  fontFamily: 'Century Gothic, sans-serif',
};

const leftSideStyle = {
  flex: 1,
  color: '#f6d7ff', 
};

const titleStyle = {
  fontSize: '12rem',
  fontWeight: 'bold',
  color: '#ccb2d3',
  letterSpacing: '2px',
  fontFamily: 'Courier New, monospace',
  marginTop: '170px',
};

const rightSideStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end', 
  justifyContent: 'center',
  textAlign: 'justify',
};

const rightSideTextStyle = {
  marginBottom: '20px',
  fontSize: '1.15rem',
  textAlign: 'justify',
};

const centerBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f4f4f4',
  borderRadius: '30px',
  padding: '40px 20px',
  maxWidth: '450px',
  width: '100%',
  height: '400px',
  position: 'relative',
};

const CapSizeStyle = {
  fontSize: '3.5rem',
  color: '#426c36', 
  marginBottom: '10px',
  fontFamily: 'BernhardMod BT, serif',
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#545454',
  marginBottom: '30px',
  whiteSpace: 'nowrap',         
  overflow: 'hidden',           
  textOverflow: 'ellipsis',
};

const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
};

const buttonStyle = {
  border: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%',
  maxWidth: '100%',
};

const startButtonStyle = {
  marginTop: '5px',
  padding: '12px 24px',
  backgroundColor: '#f4f2eb',
  color: '#426c36',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontFamily: 'Verdana, sans-serif',
};

const messageBubbleStyle = {
  position: 'absolute',
  bottom: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  borderRadius: '10px',
  backgroundColor: '#426c36',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  fontFamily: 'Verdana, sans-serif',
};

const welcomeMessageStyle = {
  fontSize: '1rem',
  color: 'white',
  fontFamily: 'Verdana, sans-serif',
};