import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>
        
                <li>
                    <Link to="/admin/users"> Users</Link>
                </li>

                
        
            </ul>
            </nav>
        </div>
    )
}