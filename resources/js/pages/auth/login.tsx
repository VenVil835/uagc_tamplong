import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, X } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handlePrivacyAgree = () => {
    setIsFadingOut(true);
    setTimeout(() => {
        setShowPrivacyModal(false);
        setIsFadingOut(false);
        }, 300); 
    };

    const handlePrivacyDisagree = () => {
        // Redirect to landing page
        window.location.href = 'http://uagc_laravel.test';
    };

    return (
        <div 
            className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
            style={{
                backgroundImage: "url('/images/login-bg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Head title="Log in" />
            
            {/* Privacy Agreement Modal */}
            {showPrivacyModal && (
                <div className={`fixed inset-0 bg-black/0.5 backdrop-blur-md flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className={`border-1 border-black bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all duration-300 ease-out ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Hello there!</h2>
                            
                            <div className="text-sm text-gray-600 mb-6">
                                <p className="mb-2">By continuing to use the system, you agree to the</p>
                                
                                <a 
                                    href="https://www.usep.edu.ph/usep-data-privacy-statement/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-600 hover:text-red-700 font-medium underline"
                                >
                                    University of Southeastern Philippines' Data Privacy Statement
                                </a>
                            </div>
                            
                            <div className="flex space-x-4 justify-center">
                                <Button
                                    onClick={handlePrivacyDisagree}
                                    className="px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition duration-200"
                                >
                                    Disagree
                                </Button>
                                <Button
                                    onClick={handlePrivacyAgree}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                                >
                                    Agree
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
            <div className="w-full max-w-6xl flex items-center justify-center">
                {/* Center - Login Form */}
                <div className="flex-1 max-w-md mx-1 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4 gap-1">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                <img src="/images/usep.png" alt="USEP logo" className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                                <img src="/images/uagc.jpg" alt="UAGC logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">UAGC Appointment System</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Hello there!</h1>
                        <p className="text-gray-600">Please login to get started.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Campus Dropdown */}
                            <div>
                                <Label htmlFor="campus" className="text-gray-700 font-medium">Campus</Label>
                                <select 
                                    id="campus"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-black"
                                >
                                    <option value="">Select Campus</option>
                                    <option value="main">Obrero</option>
                                    <option value="north">Tagum-Mabini</option>
                                    <option value="south">Mintal</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password */}
                            <div>
                                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10 text-black"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Login Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>Copyright © 2025. All Rights Reserved. SDMD</p>
                        <div className="mt-2 space-x-4">
                            <a href="#" className="text-gray-500 hover:text-gray-700">Terms of use</a>
                            <span>|</span>
                            <a href="https://www.usep.edu.ph/usep-data-privacy-statement/" 
                                    target="_blank"
                                    rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}