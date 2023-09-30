import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Components/firebase/firebase";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
      const [signIn, setSignIn] = useState('');
      const [signInError, setSignInError] = useState('');
      const emailRef = useRef(null);

      const handleSubmit = e => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(email, password);

            setSignIn('');
            setSignInError('');

            signInWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        setSignIn('Successfully Sign In')
                  })
                  .catch(error => {
                        setSignInError(error.message)
                  })
      }

      const handleResetPassword = () => {
            const email = emailRef.current.value;
            if (!email) {
                  setSignInError('Please provide an email first.')
                  return;
            }
            else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
                  setSignInError('Invalid email address')
                  return;
            }

            sendPasswordResetEmail(auth, email)
                  .then(() => { alert('Please check your email') })
                  .catch(error => console.log(error.message))
      }

      return (
            <div className="bg-base-200">
                  <div className="hero min-h-screen w-4/5 mx-auto">
                        <div className="hero-content ">
                              <form onSubmit={handleSubmit}>
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                                          <div className="card-body">
                                                <div className="form-control">
                                                      <label className="label">
                                                            <span className="label-text">Email</span>
                                                      </label>
                                                      <input ref={emailRef} type="text" name="email" placeholder="email" className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                      <label className="label">
                                                            <span className="label-text">Password</span>
                                                      </label>
                                                      <input type="text" name="password" placeholder="password" className="input input-bordered" required />
                                                      <label className="label">
                                                            <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                                      </label>
                                                </div>
                                                <div className="form-control mt-6">
                                                      <button className="btn btn-primary">Login</button>
                                                </div>
                                                <div>
                                                      {
                                                            signIn && <p className="text-green-500">{signIn}</p>
                                                      }
                                                      {
                                                            signInError && <p className="text-red-600">{signInError}</p>
                                                      }
                                                </div>
                                          </div>
                                    </div>
                                    <div>
                                          <p className="text-center">New to this website?? <Link className="font-semibold" to='/register'>Register</Link></p>
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default Login;