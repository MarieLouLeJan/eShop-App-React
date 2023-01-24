import { useRef } from 'react';
import styles from './ContactUs.module.scss'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Card from '../../components/card/Card'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactUs = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, 'template_jpsbfi5', form.current, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`)
          .then((result) => {
            toast.success('Thanks, your message has been sent successfuly')
            console.log(result.text);
          }, (error) => {
            toast.error(error.text)
            console.log(error.text);
          });
        e.target.reset()
      };

  return (
    <section>
        <div className={`container ${styles.contact}`}>
            <h2>Contact us</h2>
            <div className={styles.section}>

                <form ref={form} onSubmit={sendEmail}>
                    <Card cardClass={styles.card}>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name='user_name' 
                            placeholder='James McRoy'
                            required/>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name='user_email' 
                            placeholder='james.mcRoy@yourmail.com'
                            required/>
                        <label>Subject:</label>
                        <input 
                            type="text" 
                            name='subject' 
                            placeholder='Subject'
                            required/>
                        <label>Message:</label>
                        <textarea 
                            name='message' 
                            cols='30'
                            rows='10'
                            required>
                        </textarea>
                        <button className='--btn --btn-primary'>
                            Send message
                        </button>
                    </Card>
                </form>
                
                <div className={styles.details}>
                    <Card cardClass={styles.card2}>
                        <h3>Our contact information</h3>
                        <p>Fill the form or contact us via another channel:</p>
                        <div className={styles.icons}>
                            <span>
                                <FaPhoneAlt/>
                                <p>+33 7 49 05 44 84 </p>
                            </span>
                            <span>
                                <FaEnvelope/>
                                <p>marielou.lejan@gmail.com </p>
                            </span>
                            <span>
                                <HiOutlineLocationMarker/>
                                <p>Paris, France</p>
                            </span>
                            <span>
                                <FaTwitter/>
                                <p>@eShopMlou</p>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactUs
