import React from 'react';
import { AiOutlineHome } from '@react-icons/all-files/ai/AiOutlineHome';
import { AiOutlineGlobal } from '@react-icons/all-files/ai/AiOutlineGlobal';
import { BiNews } from '@react-icons/all-files/bi/BiNews';
import { Icon } from '@chakra-ui/react';

export function HomeIcon(props) {
  return <Icon as={AiOutlineHome} {...props} />;
}

export function GlobalIcon(props) {
  return <Icon as={AiOutlineGlobal} {...props} />;
}

export function NewsIcon(props) {
  return <Icon as={BiNews} {...props} />;
}
