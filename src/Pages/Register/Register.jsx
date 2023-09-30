import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Components/firebase/firebase";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {

      const [registerError, setRegisterError] = useState('');
      const [successfullyRegister, setSuccessfullyRegister] = useState('');
      const [showPassword, setShowPassword] = useState(false);

      const handleSubmit = e => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            const terms = e.target.terms.checked;
            const name = e.target.name.value;

            setRegisterError('');
            setSuccessfullyRegister('');

            if (password.length < 6) {
                  setRegisterError('Password should be at least 6 characters or longer')
            }
            else if (!/[A-Z]/.test(password)) {
                  setRegisterError('Must Included one or more capital letter.');
                  return;
            }
            else if (!terms) {
                  setRegisterError('Please Accept our terms and condition');
                  return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        console.log(result.user);
                        setSuccessfullyRegister('User Created Successfully...')

                        updateProfile(result.user, {
                              displayName: name
                        })
                              .then(() => { console.log('Update user successfully') })
                              .catch(error => console.log(error))

                        sendEmailVerification(result.user)
                              .then(() => {
                                    alert('Check your email for verification')
                              })
                  })
                  .catch(error => {
                        console.log(error.message);
                        setRegisterError(error.message);
                  })
      }

      const handleShowPass = () => {
            setShowPassword(!showPassword);
      }

      return (
            <div>
                  <div className="h-[80vh] flex justify-center items-center">

                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                              <form className="space-y-6" onSubmit={handleSubmit}>
                                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                                    <div>
                                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                          <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="your name" required />
                                    </div>
                                    <div>
                                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                    </div>
                                    <div className="relative">
                                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                          <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                          <span onClick={handleShowPass} className="absolute cursor-pointer text-gray-600 font-thin top-10 left-[90%] text-xl">
                                                {
                                                      showPassword ? <AiFillEye /> : <AiFillEyeInvisible />
                                                }
                                          </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                          <input type="checkbox" name="terms" id="checkbox" />
                                          <label htmlFor="checkbox">Accept our <a className="hover:text-red-500 hover:underline" href="#">terms and condition</a></label>
                                    </div>

                                    <input type="submit" value="Register" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></input>

                                    <div>
                                          <p>Already have an account?? <Link className="font-semibold" to='/login'>Login</Link></p>
                                    </div>

                              </form>
                        </div>
                  </div>

                  <div className="text-center text-xl">
                        {
                              registerError && <p className="text-red-600">{registerError}</p>
                        }
                        {
                              successfullyRegister && <p className="text-green-900">{successfullyRegister}</p>
                        }
                  </div>
            </div>
      );
};

export default Register;