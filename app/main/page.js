'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, Stack, TextField, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatContainer = styled(Box)({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    backgroundColor: "#426c36",
    padding: '16px',
    boxSizing: 'border-box',
    fontFamily: 'Verdana, sans-serif',
    position: 'relative',
    cursor: 'auto',
    '@media (max-width: 600px)': { 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '80px',
    },
});

const ChatBox = styled(Stack)({
    width: '70%', 
    maxWidth: '70%', 
    height: '100%',
    display: 'flex',
    flex: 1, 
    overflowY: 'auto', 
    flexWrap: 'wrap',
    position: 'relative',
    border: '1px solid #d1d5db',
    borderRadius: '40px',
    padding: '20px',
    backgroundColor: '#f4f2eb', 
    overflowY: 'auto', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '4px',
    fontFamily: 'Verdana, sans-serif',
    flexGrow: 1,
    cursor: 'auto',
    scrollbarWidth: 'none', 
    '&::-webkit-scrollbar': {
        display: 'none', 
    },
    '@media (max-width: 600px)': { 
        marginTop: '20px',
        width: '100%', 
    },
});


const MessageBubble = styled(Box)(({ role }) => ({
    backgroundColor: role === 'assistant' ? '#373941' : '#7ba171',
    color: role === 'assistant' ? '#ffffff' : '#ffffff',
    borderRadius: '20px',
    padding: '10px',
    maxWidth: '75%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    alignSelf: role === 'assistant' ? 'flex-start' : 'flex-end',
    marginBottom: '8px',
    fontFamily: 'Verdana, sans-serif',
    wordBreak: 'break-word',
    fontSize: '15px',
    '& p': {
        margin: '0',
        fontSize: '15px',
        fontWeight: 'normal',
    },
    '& ul': {
        paddingLeft: '20px',
        listStyleType: 'disc',
        margin: '0',
    },
    '& ol': {
        paddingLeft: '20px',
        margin: '0',
    },
    '& li': {
        marginBottom: '4px',
        fontSize: '15px',
        fontWeight: 'normal',
        lineHeight: '1.5',
    },
    '& h1, & h2, & h3': {
        fontWeight: 'bold',
        margin: '8px 0',
    },
    '& h1': {
        fontSize: '20px',
    },
    '& h2': {
        fontSize: '18px',
    },
    '& h3': {
        fontSize: '16px',
    },
}));

const InputContainer = styled(Stack)({
    width: '100%',
    maxWidth: '1020px',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Verdana, sans-serif',
    position: 'fixed',
    position: 'bottom',
    cursor: 'auto', 
});

const InputField = styled(TextField)({
    flex: 1,
    fontFamily: 'Verdana, sans-serif',
    fontSize: '15px',
    borderRadius: '20px',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
    },
});

const StyledFormControl = styled(FormControl)({
    backgroundColor: '#f4f2eb', 
    borderRadius: '30px',
    '&:hover': {
        backgroundColor: '#dbd6c5',
    },
    '& .MuiInputBase-root': {
        borderRadius: '30px',
        '&:before': {
            borderBottom: 'none', 
        },
        '&:after': {
            borderBottom: 'none', 
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none', 
        },
    },
});

export default function Home() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: "Welcome! Let's craft the perfect caption together. Where do you want to start?" }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [assistantTypingText, setAssistantTypingText] = useState('');
    const [tone, setTone] = useState('fun');
    const [platform, setPlatform] = useState('Instagram');
    const endOfChatRef = useRef(null);
    const chatBoxRef = useRef(null);

    const sendMessage = async () => {
        try {
            const newMessage = { role: 'user', content: input };
            setMessages([...messages, newMessage]);
            setInput('');
            setIsTyping(true);
            setAssistantTypingText('CapSizing...');
    
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input, tone, platform }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setMessages([...messages, newMessage, { role: 'assistant', content: data.data.generated_caption }]);
        } catch (error) {
            console.error('Error:', error.message); 
            setMessages([...messages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
        } finally {
            setIsTyping(false);
            setAssistantTypingText('');
        }
    };    

    useEffect(() => {
        endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <ChatContainer>
            <Box sx={{ 
                    position: 'absolute', 
                    top: '200px', 
                    left: '16px', 
                    fontFamily: 'Courier New, monospace', 
                    fontWeight: 'bold', 
                    fontSize: '85px', 
                    color: '#f4f2eb',
                    '@media (max-width: 550px)': { 
                        top: '60px', 
                        fontSize: '45px', 
                    },
                }}>
                CapSize
                <Stack direction="column" spacing={2} mt={1}> {/* Changed to column to stack one over the other */}
                    <StyledFormControl variant="filled" sx={{ minWidth: 400}}>
                        <InputLabel>Platform</InputLabel>
                        <Select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <MenuItem value="Instagram">Instagram</MenuItem>
                            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                            <MenuItem value="Twitter">Twitter</MenuItem>
                        </Select>
                    </StyledFormControl>
                    <StyledFormControl variant="filled" sx={{ minWidth: 400 }}>
                        <InputLabel>Tone</InputLabel>
                        <Select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                        >
                            <MenuItem value="fun">Fun</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="Casual/Conversational">Casual</MenuItem>
                            <MenuItem value="Inspirational/Motivational">Inspirational</MenuItem>
                            <MenuItem value="Humorous/Witty">Humorous</MenuItem>
                            <MenuItem value="Sincere/Heartfelt">Sincere</MenuItem>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                            <MenuItem value="Authoritative/Informative">Authoritative</MenuItem>
                            <MenuItem value="Persuasive">Persuasive</MenuItem>
                        </Select>
                    </StyledFormControl>
                </Stack>
            </Box>
            <ChatBox ref={chatBoxRef}>
                <Stack direction="column" spacing={2} flexGrow={1}>
                    {messages.map((message, index) => (
                        <MessageBubble key={index} role={message.role}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </MessageBubble>
                    ))}
                    {assistantTypingText && (
                        <MessageBubble role="assistant">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {assistantTypingText}
                            </ReactMarkdown>
                        </MessageBubble>
                    )}
                    <div ref={endOfChatRef} /> {/* For auto-scrolling */}
                </Stack>
                <InputContainer>
                    <InputField 
                        label="CapSize it!"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        variant="outlined"
                    />
                    <IconButton 
                        onClick={sendMessage} 
                        style={{ 
                            backgroundColor: isTyping ? '#3c3c3c' : '#2b2b2b',  
                            color: '#ffffff', 
                            padding: '8px',
                            borderRadius: '30px',
                            '&:hover': {
                                backgroundColor: isTyping ? '#282828' : '#1a1a1a',
                            },
                        }}
                        disabled={isTyping}
                    >
                        {isTyping ? <StopIcon /> : <SendIcon />}
                    </IconButton>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '-60px', 
                            right: '-10px', 
                            fontSize: '3rem',
                            color: 'white',
                            '@media (max-width: 600px)': {
                                fontSize: '2.5rem',
                            },
                        }}
                    >  
                    </IconButton>
                </InputContainer>
            </ChatBox>
        </ChatContainer>
    );
}