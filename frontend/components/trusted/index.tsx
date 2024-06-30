import {Button, Divider, Grid, Text} from '@nextui-org/react';
import React from 'react';
import {AcmeLogo} from '../navbar/logo';
import {Flex} from '../styles/flex';

export const Trusted = () => {
   return (
      <>
         <Flex
            direction={'column'}
            align={'center'}
            css={{
               'pt': '$20',
               'px': '$6',
               '@md': {
                  px: '$64',
               },
            }}
         >
            <Text h2 css={{textAlign: 'center'}}>
               We Are Actually Reading the Bills
            </Text>
            <Text
               css={{
                  color: '$accents8',
                  maxWidth: '800px',
                  textAlign: 'center',
               }}
               weight="normal"
               size={'$lg'}
            >
               Our democracy faces a critical challenge: thousand-page bills filled with complex language and hidden provisions shape our lives, yet remain unreadable for most citizens. This lack of transparency conceals special interests and undermines informed civic participation. We need a tool that can upload, read, and allow us to chat with these massive documents, highlighting potential lobbyist inserts and explaining complex sections in plain language. By making bills truly accessible, we can reclaim our right to be informed citizens, spot hidden agendas, and hold our representatives accountable. It's time to shine a light on the legislative process and empower every American to understand the laws that govern us. 
            </Text>
            <Grid.Container
               gap={6}
               alignItems="center"
               justify="center"
               css={{
                  'width': '100%',
                  '@sm': {
                     width: '100%',
                  },
                  '&  span': {
                     whiteSpace: 'pre',
                  },
               }}
            >
               {/* <Grid sm={3} justify="center">
                  <Flex align={'center'} justify={'center'}>
                     <AcmeLogo />
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 1
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 2
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 3
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 4
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 5
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 6
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 7
                     </Text>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <AcmeLogo />{' '}
                     <Text weight={'semibold'} span size={'$lg'}>
                        Company 8
                     </Text>
                  </Flex>
               </Grid> */}
            </Grid.Container>
         </Flex>

         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
         />
      </>
   );
};
