import styles from "./home.module.css";
import { Shield, Eye, EyeOff, ArrowRight,CopyX } from 'lucide-react';
import { use, useState } from "react";
import { Copy, Check,Repeat } from "lucide-react";

function Home() {
    const[islogin,setIslogin]=useState("");
    const [copied, setCopied] = useState(false);
    const [loginkey, setloginkey] = useState("");
    const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$*";
    const handleCopy = async () => {
            await navigator.clipboard.writeText(loginkey);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        };
    return (
        <div className={styles.boding}>
            <nav className={styles.navbar}>
                <a href="#" className={styles.navlink}>Home</a>
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
                   <Shield className="w-5 h-5 text-[#e0c8a4]" /><span className={styles.innershield}>End-to-end encrypted • No tracking • True anonymity</span>
                </div>
            </div>
            <div className={styles.enter}>
                <div className = {styles.login} onClick={()=>{setIslogin("login")}}>
                    LOGIN
                </div>
                <div className = {styles.signup} onClick={()=>{setIslogin("signup")}}>
                    SIGN-UP
                </div>
            </div>
            {islogin&&(
                <>
                <div className = {styles.model}>
                    <div className={styles.close} onClick={()=>{setIslogin("")}}><CopyX/></div>
                    <div className={styles.loginhero}>
                        {islogin==='login'?'Login':'SignUp'}
                    </div>
                    {islogin==='login'&&
                    (<form className={styles.form}>
                        <div className={styles.inputgroup}>
                            <label className={styles.inputlabel}>Login-key</label>
                            <input type="text" placeholder="Enter your Login-key" className={styles.inputfield} />
                        </div>
                        <div className={styles.inputgroup}>
                            <label className={styles.inputlabel}>Password</label>
                            <input type="password" placeholder="Enter your password" className={styles.inputfield} />
                        </div>
                        <a className={styles.t1}>Don't have an account ?<span onClick={()=>{setIslogin("signup")}}>Create Now</span></a>
                        <button type="submit" className={styles.submitbutton}>Login</button>
                    </form>)
                    }
                    {islogin==='signup'&&
                    (<form className={styles.form}>
                        <div className={styles.inputgroup}>
                            <label className={styles.inputlabel}>Login-key</label>
                            <div className={styles.loginkeycontainer}>
                                <input type="text" value = {loginkey} onChange={(e)=>setloginkey(e.target.value)} placeholder="Generate" className={styles.inputfield} />
                                    <button type="button" onClick={handleCopy} className={styles.copybutton}>
                                        {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
                                    </button>
                            </div>
                            <div className={`${styles.submitbutton} ${styles.loginkey}`}><Repeat size={18}/>Generate</div>
                        </div>
                        <div className={styles.inputgroup}>
                            <label className={styles.inputlabel}>Password</label>
                            <input type="password" placeholder="Enter your password" className={styles.inputfield} />
                            <a className={styles.t1}>Already have an account ?<span onClick={()=>{setIslogin("login")}}>Login Now</span></a>
                        </div>
                        <button type="submit" className={styles.submitbutton}>SignUp</button>
                    </form>)
                    }

                </div>
                </>
            )}
        </div>
    );
}

export default Home;