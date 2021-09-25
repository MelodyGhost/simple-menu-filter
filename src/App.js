import {
  Flex,
  Image,
  Box,
  FormControl,
  FormLabel,
  Select,
  Wrap,
  Text,
  AccordionItem,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import image from './assets/banner.jpg';
import data from './assets/data.json';
import { useState } from 'react';

function App() {
  const [menu, setMenu] = useState(data);

  const cuisine = data.map((a) =>
    JSON.parse(a['Cuisine Style'].replaceAll("'", '"'))
  );

  const uniqueCuisine = new Set(
    cuisine.reduce((prev, cur) => prev.concat(cur)),
    []
  );

  const uniqueCuisineArray = Array.from(uniqueCuisine);
  const cuisineOption = uniqueCuisineArray.map((name, i) => (
    <option key={i}>{name}</option>
  ));

  const sortOption = ['Ranking', 'Rating', 'Number of Reviews'].map(
    (item, key) => <option key={key}>{item}</option>
  );

  const filterByCuisine = (e) => {
    const cuisine = e.target.value;
    const filteredMenu = data.filter((item) =>
      item['Cuisine Style'].includes(cuisine)
    );
    setMenu(filteredMenu);
  };

  const sortBy = (e) => {
    console.log(e.target.value);
    const sortBy = e.target.value;
    const sortedMenu = [
      ...menu.sort(
        (firstItem, secondItem) => secondItem[sortBy] - firstItem[sortBy]
      ),
    ];
    setMenu(sortedMenu);
  };

  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      maxW="container.lg"
      color="#fff"
    >
      <Image src={image} w="md" h="200px" my={8} />
      <Flex w="md" justifyContent="space-between">
        <FormControl id="cuisine" w="fit-content">
          <FormLabel>Choose Cuisine</FormLabel>
          <Select
            placeholder="All"
            onChange={filterByCuisine}
            size="sm"
            width="100px"
          >
            {cuisineOption}
          </Select>
        </FormControl>
        <FormControl id="sort" w="fit-content">
          <FormLabel>Sort By:</FormLabel>
          <Select placeholder="Sort" onChange={sortBy} size="sm" width="100px">
            {sortOption}
          </Select>
        </FormControl>
      </Flex>
      <Wrap wrap="wrap" w="md" spacing={4} dir="column" mt="4">
        {menu.map((d, i) => (
          <MenuItem item={d} key={i} />
        ))}
      </Wrap>
    </Flex>
  );
}

const MenuItem = ({ item }) => {
  const cuisine = JSON.parse(item['Cuisine Style'].replaceAll("'", '"'));
  return (
    <Box
      w="200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={'5px'}
      mb="10px"
      border="1px solid #ddd"
      flexDir="column"
      bg="#eee"
      color="#222"
    >
      <Text fontWeight="bold">{item.Name}</Text>
      <Text>{item.City}</Text>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <AccordionIcon />
              <Box flex="1" textAlign="left">
                Cuisine
              </Box>
            </AccordionButton>
          </h2>
          {cuisine.map((c) => (
            <AccordionPanel p="0">{c}</AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
      <Text>Reviews: {item['Number of Reviews']}</Text>
      <Box display="flex" justifyContent="space-between" w="100%">
        <Text>#{item.Ranking}</Text>
        <Text>{item.Rating}⭐</Text>
      </Box>
    </Box>
  );
};

export default App;
