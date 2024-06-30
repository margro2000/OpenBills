import {Button, Divider, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import Link from 'next/link';

export const Trial = () => {
   return (
      <>
         <Flex
            css={{
               py: '$20',
               px: '$6',
            }}
            justify={'center'}
            direction={'column'}
            align={'center'}
         >
            <Text h3>Get Started Now</Text>
            <Text
               span
               css={{
                  color: '$accents8',
                  pb: '$15',
                  textAlign: 'center',
               }}
            >
              It's as simple as uploading a document and chatting with it. All users get access and it gets added to our library
            </Text>

            <Link href="/billreader">

        <Button>Upload a Bill</Button>
 
</Link>
         </Flex>

         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
         />
      </>
   );
};
