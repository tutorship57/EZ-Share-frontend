import React from 'react'


const LoginForm = ({ handleSubmit,isLogin, onSubmit, errors, register }) => {

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className={`${Object.keys(errors).length === 0 ? "space-y-6" : ("")} `}>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}

            {!isLogin && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                type="text"
                className={`w-full px-4 py-3 border border-gray-300  text-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent `}
                // value={formData.name}
                {...register("name",{required:"please fill up your name !"})}
                // onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm py-2">{errors.name.message}</p>
                )}
            </div>
            )}

            <div className={` ${!(errors.name?.message)?  "mt-6" : ""}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                // value={formData.email}
                {...register("email",{required:"please fill up your email !"})}
                // onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && (
            <p className="text-red-500 text-sm py-2">{errors.email.message}</p>
            )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
                type="password"
                {...register("password", { required: "password required at least 8 charactor !", minLength: 8 })}
                className="w-full px-4 py-3 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                // value={formData.password}
                // onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && (
                <p className="text-red-500 text-sm py-2">{errors.password.message}</p>
            )}
            </div>

            <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors ${errors.name?.message && !(errors.password?.message) ?  "mt-6" : "mt-2"}`}
            >
            {isLogin ? 'Sign In' : 'Create Account'}
            </button>
        </form>
    </>
       
  );
}

export default LoginForm
