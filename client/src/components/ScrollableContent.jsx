import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const ScrollableContent = ({ navItems }) => {
  const scrollRef = useRef(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(true);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const scrollHeight = scrollRef.current.scrollHeight;
    const clientHeight = scrollRef.current.clientHeight;

    setShowTopArrow(scrollTop > 0);
    setShowBottomArrow(scrollTop + clientHeight < scrollHeight);
  };

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box ref={scrollRef}>
      {showTopArrow && (
        <IconButton
          aria-label="Scroll to top"
          onClick={handleScrollToTop}
        >
          <ArrowUpward />
        </IconButton>
      )}

      <List>
        {navItems.map(({ text }) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      {showBottomArrow && (
        <IconButton
          aria-label="Scroll to bottom"
          onClick={handleScrollToBottom}
        >
          <ArrowDownward />
        </IconButton>
      )}
    </Box>
  );
};

export default ScrollableContent;
