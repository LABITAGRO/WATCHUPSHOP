import { useEffect, useRef,  useState } from "react";
import { TweenMax, Power4 } from 'gsap';
import { SupervisorAccount } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Badge,FormControlLabel, Checkbox , Box, IconButton, TextField , Typography, Modal ,Button , useMediaQuery, useTheme } from "@mui/material";
// import { Link } from 'react-router-dom';
import { Phone, Email, Watch, ShoppingCart,} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import {  tokens } from "../../theme2";
// import LoginSignupModal from '../global/LoginSignupModal'; // Import the LoginSignupModal component
import RegisterModal from './RegisterModal'; 
// import LoginModal from './LoginModal';




function Navbar() {

  // const history = useHistory();

  // const handleLoginIconClick = () => {
  //   // Redirect to the LoginModal.js file in the same directory
  //   history.push('/LoginModal');
  // };



  
  let navItem = useRef(null);
  let navOption0 = useRef(null);
  let navOption1 = useRef(null);
  let navOption2 = useRef(null);
  let navOption3 = useRef(null);

  useEffect(() => {
    TweenMax.to(
      navItem,
      { opacity: 1, duration: 1, delay: 1, ease: Power4.easeInOut, }
    );
    TweenMax.to(
      navOption0,
      { opacity: 1, duration: 1, delay: 1.9, ease: Power4.easeInOut, }
    );
    TweenMax.to(
      navOption1,
      { opacity: 1, duration: 1, delay: 2.2, ease: Power4.easeInOut, }
    );
    TweenMax.to(
      navOption2,
      { opacity: 1, duration: 1, delay: 2.5, ease: Power4.easeInOut, }
    );
    TweenMax.to(
      navOption3,
      { opacity: 1, duration: 1, delay: 2.9, ease: Power4.easeInOut, }
    );
  }, []);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
    const handleLoginOpen = () => {
      setIsLoginOpen(true);
    };

     const handleLoginClose = () => {
      setIsLoginOpen(false);
    };

    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  const breakPoint = useMediaQuery("(max-width:749px)");
  // const smobilePoint = useMediaQuery("(max-width:370px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [navbar, setNavbar] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const scrollHeader = () => {
    window.scrollY >= 300 ? setNavbar(true) : setNavbar(false);
  };
  window.addEventListener('scroll', scrollHeader);

  // const handleAdminIconClick = () => {
  //   // Open the login/signup modal when admin icon is clicked
  //   // Implement your logic here
  // };

  // const Navbar = ({ cart, handleAdminIconClick, dispatch, setIsCartOpen }) => {
    

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginContent, setLoginContent] = useState(true)
  // }

  const handleSubmitForm = async () => {

    if (loginContent) {
      // Handle the login logic and make a request to the backend here
      try {
        const response = await fetch("http://localhost:3500/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          setWelcomeMessage("Welcome, User!"); 
          handleLoginClose(); // Close the login modal
          navigate('/');    // Redirect to Homepage
        } else {
          alert("Login failed")
        }
      } catch (error) {
        console.error("Login error:", error)
        alert("An error occurred during login")
      }
    } else {
      // Handle signup logic and make a request to the backend here
      try {
        const response = await fetch("http://localhost:3500/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        })

        if (response.ok) {
          alert("Signup successful")
          setLoginContent(true) // Switch to login after successful signup
        } else {
          const errorData = await response.json() // Parse the error response from the server
          console.error("Signup failed:", errorData.error)
          alert("Signup failed: " + errorData.error)
        }
      } catch (error) {
        console.error("Signup error:", error)
        alert("An error occurred during signup")
      }
    }
  }

  return (
    <>
    <Box  
      backgroundColor="transparent"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="80px"
      color="black"
      position="absolute"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        ref={el => { navItem = el; }}
        width="100%"
        border="1px solid rgba(255, 255, 255, 0.01)"
        py="1px"
        display={navbar || breakPoint ? "none" : "block"}
        sx={{
          opacity: "0",
        }}
      >
        <Box
          width="83%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          background="rgba(255, 255, 255, 0.05)"
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer", color: "#8f8f8f" } }}
            color="white"
            fontWeight="bold"
          >
            <IconButton
              sx={{
                "&:hover": { cursor: "pointer", 
              },
              color: "#cccccc",
              }}
            >
              <Phone />
            </IconButton>
            +91 99494 22044
          </Box>
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer", color: "#8f8f8f" } }}
            color="white"
            fontWeight="600"
          >
            <IconButton
              sx={{
                "&:hover": { cursor: "pointer" },
                color: "#cccccc",
              }}
            >
              <Email />
            </IconButton>
            watchupshop.com
          </Box>
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer", color: "#7c7b7b" } }}
            color="white"
            fontWeight="600"
          >
            <i>- Watch Your Wrist...</i>
          </Box>
        </Box>
      </Box>
      <Box
        width="100%"
        border="1px solid rgba(255, 255, 255, 0.02)"
        py="10px"
        backgroundColor="rgba(192, 175, 175, 0.02)"
        display={navbar ? "none" : "block"}
      >
        <Box
          width={breakPoint ? "95%" : "80%"}
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer" } }}
            color={"#f4a261"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
          >
            {/* <IconButton

              sx={{
                color: "#8f8f8f",
                "&:hover": { cursor: "pointer" },
                fontSize: "23px",
                mr: "3px",
              }}
            >
              <Watch />
            </IconButton> */}
            <Box
              display="flex"
              alignItems="center"
              mt="3px"
            >
               <Typography
    variant="h4"
    style={{
        fontSize: '28px', // Default font size for desktop
        '@media (max-width: 599px)': {
            fontSize: '10px', // Font size for mobile screens
        },
    }}
>
    Watchupshop
</Typography>


            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          > 
            {/* <IconButton
              ref={el => { navOption0 = el; }}
              sx={{
                color: "#8f8f8f",
                "&:hover": { cursor: "pointer", color: colors.redAccent[300] },
                display: smobilePoint ? "none" : "flex",
                opacity: 0,
              }}
            >
              <Search />
            </IconButton> */}

            {/* Admin Login Icon
            <IconButton
            sx={{
              color: colors.primary[200],
              "&:hover": { cursor: "pointer", color: colors.redAccent[300] },
            }}
            onClick={handleAdminIconClick} // Call handleAdminIconClick function on click
          >
            <SupervisorAccount />
          </IconButton> */}

            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                ref={el => { navOption1 = el; }}
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{
                  color: "#8f8f8f",
                  "&:hover": { cursor: "pointer", color: colors.redAccent[300] },
                  opacity: "0"
                }}
              >
                <ShoppingCart />
              </IconButton>
            </Badge>


{/* //admin icon */}
{/* //admin icon */}
<Badge
  color="secondary"
  sx={{
    "& .MuiBadge-badge": {
      right: 2, // Adjusted for smaller devices
      top: 2, // Adjusted for smaller devices
      padding: "0 4px",
      height: "14px",
      minWidth: "13px",
    },
  }}
>
  <IconButton
    ref={el => { navOption2 = el; }}
    onClick={handleLoginOpen} // Call handleLoginOpen function on click
    sx={{
      color: colors.primary[200],
      "&:hover": { cursor: "pointer", color: colors.redAccent[300] },
    }}
  >
    <SupervisorAccount />
  </IconButton>
</Badge>

<Modal open={isLoginOpen} onClose={handleLoginClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: '#000', // Dark background color
      boxShadow: 24,
      p: 4,
      borderRadius: 2, // Add border radius for a rounded look
      maxWidth: 400,
      width: '90%',
      textAlign: 'center',
    }}
  >
    <Typography variant="h4" sx={{ fontSize: '48px', color: '#FFD600', mb: 2 }}>
      Watchupshop
    </Typography>
    {loginContent && (
      <>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="username"
            label="Username"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              style: { color: '#FFF' }, // White text color
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: '#FFF' }, // White text color
            }}
          />
        </Box>
      </>
    )}
    {!loginContent && (
      <>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              style: { color: '#FFF' }, // White text color
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: '#FFF' }, // White text color
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: '#FFF' }, // White text color
            }}
          />
        </Box>
      </>
    )}
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mb: 2 }}
      onClick={handleSubmitForm}
    >
      {loginContent ? 'LOGIN' : 'SIGNUP'}
    </Button>
    <Typography variant="body2" sx={{ color: '#FFF', mb: 2 }}>
      {loginContent ? "Don't have an Account?" : "Already have an account?"}
    </Typography>
    <Button
      id="toggleLoginFormBtn"
      variant="outlined"
      color="primary"
      fullWidth
      onClick={() => setLoginContent(!loginContent)}
    >
      {loginContent ? 'Create new account' : 'Login'}
    </Button>
  </Box>
</Modal>





     

          </Box>
        </Box>
      </Box>
      {/* fixed navbar  */}
      <Box
        backgroundColor={colors.primary[800]}
        display={navbar ? "block" : "none"}
        // flexDirection="column"
        alignItems="center"
        width="100vw"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
        borderBottom={`2px solid ${colors.primary[700]}`}

        sx={{
          transition: ".5s",
        }}

      >
        <Box
          width={breakPoint ? "95%" : "80%"}
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py="10px"
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer" } }}
            color={colors.redAccent[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
          >
            <IconButton

              sx={{
                color: colors.primary[100],
                "&:hover": { cursor: "pointer" },
                fontSize: "23px",
                mr: "3px",
              }}
            >
              <Watch />
            </IconButton>
            <Box
              display="flex"
              alignItems="center"
              mt="3px"
            >
               <Typography variant="h4" style={{ fontSize: '25px' }}> Watchupshop
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{
                  color: colors.primary[200],
                  "&:hover": { cursor: "pointer", color: colors.redAccent[300] }
                }}
              >
                <ShoppingCart />
              </IconButton>
            </Badge>

            
          </Box>
        </Box>
      </Box>
      
    </Box>
    </>
  );
}
export default Navbar;
