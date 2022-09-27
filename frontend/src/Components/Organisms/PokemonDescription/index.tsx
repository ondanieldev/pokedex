import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { GiBroadsword, GiHealthNormal } from 'react-icons/gi';

import IPokemon from '../../../@Types/IPokemon';
import usePokemons from '../../../Hooks/usePokemons';

interface IProps {
  name: string;
}

const PokemonDescription: React.FC<IProps> = ({ name }) => {
  const { showPokemon } = usePokemons();

  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const avatar = useMemo(
    () => pokemon?.sprites?.front_default || '',
    [pokemon],
  );
  const elements = useMemo(
    () => pokemon?.types.map(type => type.type.name).join(', '),
    [pokemon],
  );
  const hp = useMemo(
    () => pokemon?.stats.find(stats => stats.stat.name === 'hp')?.base_stat,
    [pokemon],
  );
  const attack = useMemo(
    () => pokemon?.stats.find(stats => stats.stat.name === 'attack')?.base_stat,
    [pokemon],
  );
  const abilities = useMemo(
    () => pokemon?.abilities.map(ability => ability.ability.name) || [],
    [pokemon],
  );
  const cardColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    setIsLoading(true);
    showPokemon(name)
      .then(data => {
        if (!data) return;
        setPokemon(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showPokemon, name]);

  return (
    <Skeleton isLoaded={!isLoading && !!pokemon}>
      {pokemon ? (
        <Box
          bg={cardColor}
          w="100%"
          p={{ base: '6', md: '8' }}
          rounded={{ sm: 'lg' }}
          shadow={{ md: 'base' }}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '4', md: '10' }}
          >
            <Avatar size="2xl" src={avatar} />
            <Box width="full">
              <Flex justifyContent="space-between" alignItems="center">
                <Heading
                  size="md"
                  fontWeight="extrabold"
                  letterSpacing="tight"
                  marginEnd="6"
                  textTransform="capitalize"
                >
                  {name}
                </Heading>
              </Flex>
              <Text mt="1" fontWeight="medium" textTransform="capitalize">
                {elements}
              </Text>
              <Stack spacing="1" mt="2">
                <HStack fontSize="sm">
                  <Icon as={GiHealthNormal} color="green.500" />
                  <Text>{hp}</Text>
                </HStack>
                <HStack fontSize="sm">
                  <Icon as={GiBroadsword} color="orange.500" />
                  <Text>{attack}</Text>
                </HStack>
              </Stack>

              <Text fontWeight="semibold" mt="8" mb="2">
                Abilities
              </Text>
              <Wrap textTransform="capitalize" shouldWrapChildren>
                {abilities.map((ability, index) => (
                  <Tag key={index}>{ability}</Tag>
                ))}
              </Wrap>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>This pokemon data is not available!</AlertTitle>
        </Alert>
      )}
    </Skeleton>
  );
};

export default PokemonDescription;
