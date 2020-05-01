import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';


const icons = [
    faFacebookF, faTwitter, faLinkedinIn, faEnvelope, faWhatsapp
  ];

library.add(...icons);
