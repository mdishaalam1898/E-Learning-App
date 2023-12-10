import React from "react";
import styles from "./Chapter.module.css";
import { useParams, useOutletContext } from "react-router-dom";
function Chapter() {
  const {chapterId} = useParams();
  const course = useOutletContext();
  const chapter = course.chapters.find((chapter)=>String(chapter.chapter)===chapterId);
  return (
    <div>
      <h1>{chapter.title}</h1>
      <h2 className={styles.title}>{chapter.description}</h2>
      <p className={styles.para}>{chapter.details}</p>
      <br />
      <br />
      <div className={styles.videos}>
        <iframe
          width="800"
          height="560"
          src={chapter.video}
          title="React Video"
          frameborder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Chapter;
