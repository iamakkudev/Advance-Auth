import { motion } from 'motion/react'
import {Link, useNavigate} from 'react-router-dom'
import {Loader, Lock, Mail, User} from 'lucide-react'
import Input from '../components/Input';
import { useState } from 'react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';




const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
  const { signup,error,isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async(e) =>{
    e.preventDefault();
    try {
      await signup(formData.email,formData.password,formData.name);
      setFormData({...formData, email:'',name:'',password:''})
      navigate("/verify-email")
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <motion.div
    initial={{opacity: 0,y:20}}
    animate={{opacity: 1,y:0}}
    transition={{duration:1}}
    className='max-w-md w-full bg-gray-800/50 backdrop-sepia-0 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden'
    >
    <div className="p-8">
      <h2
      className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'
      >
        Create an Account
      </h2>

      <form onSubmit={handleSignUp}>
        <Input
        icon={User}
        type='text'
        placeholder='Enter the Full Name'
        value={formData.name}
        onChange={(e)=> setFormData({...formData, name:e.target.value})}
        />
        <Input
        icon={Mail}
        type='email'
        placeholder='Enter the Email'
        value={formData.email}
        onChange={(e)=> setFormData({...formData, email:e.target.value})}
        />
        <Input
        icon={Lock}
        type='password'
        placeholder='Enter the Password'
        value={formData.password}
        onChange={(e)=> setFormData({...formData, password:e.target.value})}
        />
        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        <PasswordStrengthMeter password={formData.password}/>
        <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
            disabled={isLoading}
            >
              {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "SignUp"}
            </motion.button>
      </form>
    </div>
    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
    </motion.div>
  )
}

export default SignUpPage;