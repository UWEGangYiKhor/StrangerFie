-- Table: public.publish_image
CREATE TABLE IF NOT EXISTS public.publish_image
(
    id SERIAL NOT NULL,
    image BYTEA NOT NULL,
    background_image BYTEA NOT NULL,
    publish_date TIMESTAMP with time zone,
    archived BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT publish_image_pkey PRIMARY KEY (id)
);

-- Table: public.images
CREATE TABLE IF NOT EXISTS public.images
(
    id SERIAL NOT NULL,
    image_blob BYTEA NOT NULL,
    blurred_image_blob BYTEA NOT NULL,
    person_image_blob BYTEA NOT NULL,
    blurred_person_image_blob BYTEA NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT false,
    publish_id INTEGER,
    CONSTRAINT original_images_pkey PRIMARY KEY (id),
    CONSTRAINT publish_id_key FOREIGN KEY (publish_id)
        REFERENCES public.publish_image (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);