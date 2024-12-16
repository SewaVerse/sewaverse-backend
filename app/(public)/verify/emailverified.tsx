import Image from "next/image";

export default function EmailVerified () {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
          <div className="flex items-center space-x-2">
            <Image src="/images/mainLogo.svg" alt="logo" width={40} height={40} />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Image
                src="/images/profile.svg"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
          </div>
        </header>
  
        {/* Content */}
        <main className="flex flex-1 flex-col items-center justify-center w-full px-4">
          <div className="text-center">
            {/* Illustration */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/email.svg"
                alt="logo"
                width={300}
                height={300}
              />
            </div>
  
            {/* Message */}
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Congratulations, your email is verified
            </h1>
            <p className="text-gray-500 text-sm">
            Redirecting you to the next step......
            </p>
          </div>
        </main>
      </div>
        );

  }

