import styles from "./guest.module.css";
import { Shield, Eye, EyeOff, ArrowRight, CopyX } from 'lucide-react';
import { useState } from "react";
import { Copy, Check, Repeat } from "lucide-react";
import { useEffect } from "react";


function Guest() {
    const [islogin, setIslogin] = useState("");
    const [copied, setCopied] = useState(false);
    const [loginkey, setloginkey] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [caution,setcaution] = useState("Make sure you remember credentials,as they are non recoverable");
    const[loadergenerator,setloadergenerator] = useState(false);
    const[enterdetails,setdetails]=useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const[username,setusername] = useState("");
    const[usernameok,setusernameok] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    // Add this near your other state variables

// 1. Change handleusername to ONLY update the text input


useEffect(() => {
    if (!username) {
        setusernameok(false);
        setIsCheckingUser(false);
        return;
    }

    if (username.length < 5) {
        setusernameok(false);
        setIsCheckingUser(false);
        return;
    }

    const timeoutId = setTimeout(async () => {
        setIsCheckingUser(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACK_URL}/api/auth/checkusername`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username })
                }
            );
            const data = await res.json();
            setusernameok(!!data.available);
        } catch {
            setusernameok(false);
        }
        setIsCheckingUser(false);
    }, 500);

    return () => clearTimeout(timeoutId);
}, [username]);
 // Dependencies: run this whenever 'username' changes

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const generateloginkey = async() => {
        setloadergenerator(true);
        try {
            await delay(1000);
            setError("");
            const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/auth/generateloginkey`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to generate login key");
            }

            if (data && data.loginkey) {
                setloginkey(data.loginkey);
            }
        } catch(error) {
            console.error("Generate key error:", error);
            setError(error.message || "Failed to generate login key");
        }
        setloadergenerator(false);
    }

    const handlelogin = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!loginkey.trim() || !password.trim()) {
                throw new Error("Please fill in all fields");
            }

            const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginkey: loginkey.trim(),
                    password: password.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }
            if(!data.user.details){
                setusername(""); 
                setusernameok(false);
                setdetails(1);
                setIslogin("");
            }
            else{
                setIslogin("");
            }
            console.log("Login successful:");
            alert("Login successful!");
            // if(data.details)
            // Add your redirect logic here

        } catch(error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handlesignup = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!loginkey.trim() || !password.trim()) {
                throw new Error("Please fill in all fields");
            }

            if (!loginkey) {
                throw new Error("Please generate a login key first");
            }

            console.log("Sending signup request:");

            const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginkey: loginkey.trim(),
                    password: password.trim()
                })
            });

            console.log("Response status:", res.status);
            console.log("Response ok:", res.ok);

            // Check if response is JSON
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Non-JSON response:", text);
                throw new Error("Server error: Invalid response format");
            }

            const data = await res.json();
            console.log("Response data:", data);

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            console.log("Signup successful:");
            alert("Signup successful! You can now login.");
            setIslogin("login");
            setpassword("");

        } catch(error) {
            console.error("Signup error:", error);
            setError(error.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(loginkey);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch(error) {
            console.error("Copy error:", error);
            setError("Failed to copy to clipboard");
        }
    };

    const handleusername = (e) => {
    const value = e.target.value;
    setusername(value);
    setusernameok(false); // Reset status while they are typing
    };

    const handleusernamesubmission=async()=>{
        if(!usernameok){return}
        try{
            const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/auth/updatedata`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginkey: loginkey,
                    data:username,
                })
            });
            const data = await res.json();
            if(data){setdetails(0);setusername("")}
            else{setdetails(1);}

        }catch(error){
            console.error("username error :", error);
        }

    }

    const detailsmodal = ()=>{
        return(
        <div className={styles.detailModel}>
            <h2 className={styles.detailTitle}>Welcome</h2>

                {/* Username */}
            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                    Username*
                </label>
                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="e.g. silent_moth"
                    maxLength={20}
                    value={username}
                    onChange={(e)=>{handleusername(e)}}
                    autoComplete="off"
                    minLength={5}
                />
                {username && (
                            <div className={`${styles.error} ${styles.caution} ${usernameok ? styles.green : styles.red}`}>
                                {username.length < 5 ? ("Minimum 5 characters required") 
                                    : isCheckingUser ? (<span className={styles.loader}></span>) 
                                        : usernameok ? ("Username available") 
                                        : ("Username not available")}
                            </div>
                )}
                <span className={styles.helperText}>
                    Make most irrelevent username to stay more anonymous.
                </span>
            </div>

                {/* Consent Section */}
            <div className={styles.consentSection}>
                    {/* Terms & Conditions */}
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <span>
                        I agree to the{" "}
                        <a
                            className={styles.linkButton}
                            href="https://chatgpt.com/c/694027cc-74dc-8321-9acf-6674cc943947"
                            target="_blank"
                            >
                            Terms & Conditions
                        </a>
                    </span>
                </label>

                {/* Age Verification */}
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={ageConfirmed}
                        onChange={(e) => setAgeConfirmed(e.target.checked)}
                    />
                    <span>
                        I confirm that I am 18 years or older
                    </span>
                </label>

            </div>
            <span className={styles.helperText}>
                    Username is non-credential and can be changed later
            </span>

        {/* Action */}
            <button
                className={styles.continueButton}
                disabled={!termsAccepted || !ageConfirmed || !usernameok}
                onClick={handleusernamesubmission}
                >
                Continue
            </button>
            <button
                className={styles.continueButton}
                onClick={()=>{setdetails(0);setusername("");setusernameok(false);}}>
                    Cancel
            </button>
        </div>
        )

    }

    return (
        <div className={styles.boding}>
            {enterdetails===1&& detailsmodal()}

            <nav className={styles.navbar}>
                <a href="#" className={styles.navlink}>Guest</a>
                <a href="#" className={styles.navlink}>About</a>
                <a href="#" className={styles.navlink}>Why choose?</a>
            </nav>

            <div className={styles.heroContainer}>
                <h1 className={styles.title}>
                    BABU<span className={styles.innertitle}>DOWN</span>
                </h1>
                <div className={styles.tagline}>
                    ENOUGH OF DOG SHIT, <br />
                    LET US GIVE THEM WHAT THEY <span className={styles.highlight}>DESERVE</span>
                </div>
                <div className={styles.shield}>
                    <Shield className="w-5 h-5 text-[#e0c8a4]" />
                    <span className={styles.innershield}>End-to-end encrypted • No tracking • True anonymity</span>
                </div>
            </div>

            <div className={styles.enter}>
                <div className={styles.login} onClick={() => { setIslogin("login"); setError(""); }}>
                    LOGIN
                </div>
                <div className={styles.signup} onClick={() => { setIslogin("signup"); setError(""); }}>
                    SIGN-UP
                </div>
            </div>

            {islogin && (
                <>
                    <div className={styles.model}>
                        <div className={styles.close} onClick={() => { setIslogin(""); setError(""); }}>
                            <CopyX />
                        </div>
                        <div className={styles.loginhero}>
                            {islogin === 'login' ? 'Login' : 'SignUp'}
                        </div>

                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}

                        {islogin === 'login' && (
                            <form className={styles.form} onSubmit={handlelogin}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.inputlabel}>Login-key</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your Login-key" 
                                        value={loginkey} 
                                        onChange={(e) => setloginkey(e.target.value)} 
                                        className={styles.inputfield}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.inputgroup}>
                                    <label className={styles.inputlabel}>Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        value={password} 
                                        onChange={(e) => setpassword(e.target.value)} 
                                        className={styles.inputfield}
                                        disabled={loading}
                                    />
                                </div>
                                <a className={styles.t1}>
                                    Don't have an account? 
                                    <span onClick={() => { setIslogin("signup"); setError(""); }}>Create Now</span>
                                </a>
                                <button 
                                    type="submit" 
                                    className={styles.submitbutton}
                                    disabled={loading}
                                >
                                    {loading ? (<span className={styles.loader}></span>) : "Login"}
                                </button>
                            </form>
                        )}

                        {islogin === 'signup' && (
                            <>
                            {caution && (
                            <div className={`${styles.error} ${styles.caution}`}>
                                {caution}
                            </div>
                            )}
                            <form className={styles.form} onSubmit={handlesignup}>
                                <div className={styles.inputgroup}>
                                    <label className={styles.inputlabel}>Login-key</label>
                                    <div className={styles.loginkeycontainer}>
                                        <input 
                                            type="text" 
                                            disabled
                                            value={loginkey} 
                                            placeholder="Click to Generate" 
                                            className={styles.inputfield}
                                            autoComplete="new-password"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={handleCopy} 
                                            className={styles.copybutton}
                                            disabled={!loginkey}
                                        >
                                            {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                    <div 
                                        onClick={generateloginkey} 
                                        className={`${styles.submitbutton} ${styles.loginkey}`}
                                    >
                                        {loadergenerator ? (
                                        <span className={styles.loader}></span>
                                    ) : (<><Repeat size={18} />Generate</>)}
                                    </div>
                                </div>
                                <div className={styles.inputgroup}>
                                    <label className={styles.inputlabel}>Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        className={styles.inputfield} 
                                        value={password} 
                                        onChange={(e) => setpassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <a className={styles.t1}>
                                        Already have an account? 
                                        <span onClick={() => { setIslogin("login"); setError(""); }}>Login Now</span>
                                    </a>
                                </div>
                                <button 
                                    type="submit" 
                                    className={styles.submitbutton}
                                    disabled={loading || !loginkey}
                                >
                                    {loading ? (
                                        <span className={styles.loader}></span>
                                    ) : "SignUp"}
                                </button>
                            </form>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Guest;
