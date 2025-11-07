import React from 'react'


const LoginForm = ({ handleSubmit,isLogin, onSubmit, errors, register,watch }) => {

  const password = watch("password");
  console.log("this is watch password ",password?.length)
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4`}>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}

            {!isLogin && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                type="text"
                className={`w-full px-4 py-3 border border-gray-300  text-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent `}
                // value={formData.name}
                {...register("name",{required:"please fill up your name !"})}
                // onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm ">{errors.name.message}</p>
                )}
            </div>
            )}

            <div className={` ${!(errors.name?.message)?  "" : ""}  `}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                // value={formData.email}
                {...register("email",{required:"please fill up your email !"})}
                // onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && (
            <p className="text-red-500 text-sm ">{errors?.email?.message }</p>
            )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
                type="password"
                {...register("password", { required: "password required at least 8 charactor !", minLength: 8 })}
                className="w-full px-4 py-3 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                // value={formData.password}
                // onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {(errors.password  || password?.length < 8) &&(
                <p className="text-red-500 text-sm ">{errors?.password?.message }</p>
            )}
            </div>

            <button
            type="submit"
            className={`w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors `}
            >
            {isLogin ? 'Sign In' : 'Create Account'}
            </button>
        </form>
    </>
       
  );
}

export default LoginForm
