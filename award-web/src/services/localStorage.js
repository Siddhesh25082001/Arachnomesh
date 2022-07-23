// Function to Set User
const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

// Function to Remove User
const removeUser = () => {
    localStorage.removeItem("user");
};

// Function to Get User
const getUser = () => {
    
    try {
        const user = localStorage.getItem("user");
        return JSON.parse(user);
    } 
  
    catch (error) {
        console.log(error);
    }
};

// Function to Get Token
const getToken = () => {
    
    try {
        const token = getUser().token;
        return token;
    } 
    catch (error) {
        console.log({
            message: "Error in Getting the Token", 
            error: error
        });
    }
};

// Function to Get User Id
const getUserId = () => {
    const userId = getUser().user._id;
    return userId;
};

export default {
  setUser,
  removeUser,
  getUser,
  getToken,
  getUserId,
};
