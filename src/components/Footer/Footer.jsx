import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <MDBFooter bgColor='light' className='text-center text-lg-left footerPosition'>
                <div className='text-center p-3 bgGray'>
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    <span className='text-dark'>JSONice</span>
                    <span className='text-dark'> - Matheus Nogueira</span>
                </div>
            </MDBFooter>
        )
    }
}

export default Footer;