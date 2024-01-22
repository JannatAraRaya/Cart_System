"use client";
import Link from 'next/link';
import "./index.scss";
import { useRouter } from "next/navigation";
import Login from '@/app/pages/Login';

type Props = {};

const Navbar = (props: Props) => {
    const navigate = useRouter();
    const handleLoginClick = () => {
    navigate.push('/login');
    };
    return (
        <nav className="navbar">
            <div className="navbar__logo">Pixel Market</div>
            <div className="navbar__navLinks">
                <Link href="/">Products</Link>
                <Link href="">About</Link>
                <Link href="">Contact</Link>
            </div>
            <div className="navbar__loginButton">
                <Link href="/login">
                    <button>      
                     <span onClick={handleLoginClick}>
                        <Login />
                    </span>
                    </button>
                </Link>
            </div>
            {/* <div className="loginButton">
        <button>Login</button>
      </div> */}
        </nav>
    );
};

export default Navbar;
