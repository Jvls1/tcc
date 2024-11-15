CREATE TABLE voluntary (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE interest (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE opportunity (
    id SERIAL PRIMARY KEY,
    voluntaries_count INTEGER NOT NULL,
    name VARCHAR(255),
    description VARCHAR(1024),
    event_date TIMESTAMP NOT NULL,
    organization_id INTEGER NOT NULL,
    open BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organization(id)
);

CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL
);

CREATE TABLE voluntary_skill (
    voluntary_id INT REFERENCES voluntary(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skill(id) ON DELETE CASCADE,
    PRIMARY KEY (voluntary_id, skill_id)
);

CREATE TABLE voluntary_interest (
    voluntary_id INT REFERENCES voluntary(id) ON DELETE CASCADE,
    interest_id INT REFERENCES interest(id) ON DELETE CASCADE,
    PRIMARY KEY (voluntary_id, interest_id)
);

CREATE TABLE opportunity_voluntary (
    opportunity_id INT REFERENCES opportunity(id) ON DELETE CASCADE,
    voluntary_id INT REFERENCES voluntary(id) ON DELETE CASCADE,
    PRIMARY KEY (opportunity_id, voluntary_id)
);

CREATE TABLE organization_user (
    organization_id INT REFERENCES organization(id) ON DELETE CASCADE,
    user_id INT REFERENCES app_user(id) ON DELETE CASCADE,
    PRIMARY KEY (organization_id, user_id)
);

INSERT INTO app_user (name, email, password, admin, active)
VALUES ('João Vitor Lopes', 'joaovlopes000@gmail.com', 'senha1234', TRUE, TRUE);

INSERT INTO voluntary (name, email, password, active)
VALUES ('João Vitor Lopes', 'joaovlopes000@gmail.com', 'senha1234', TRUE)

INSERT INTO organization (name, description, active)
VALUES
('Cuidadores do Futuro', 'Organização focada em atividades de educação e mentoria para jovens em situação de vulnerabilidade.', TRUE),
('Sorrisos para Todos', 'Promove eventos recreativos e campanhas de saúde em comunidades carentes.', TRUE),
('Mãos que Ajudam', 'Grupo dedicado à distribuição de alimentos e suprimentos para pessoas em situação de rua.', TRUE),
('Verde Esperança', 'Organização ambiental que realiza plantios de árvores e ações de conscientização ecológica.', TRUE),
('Abrigo dos Animais', 'Abrigo voluntário para resgate e cuidados de animais abandonados, com campanhas de adoção.', TRUE),
('Construindo Sonhos', 'Promove reformas de casas para famílias em situação de vulnerabilidade social.', TRUE),
('Saúde em Movimento', 'Organização que realiza campanhas de saúde e bem-estar em comunidades de baixa renda.', TRUE),
('Amigos do Saber', 'Grupo que promove atividades de reforço escolar e acesso à leitura para crianças e adolescentes.', TRUE),
('Corações Solidários', 'Organização focada em campanhas de doação de roupas e agasalhos para o inverno.', TRUE),
('Mãos Unidas', 'Organização que realiza oficinas de capacitação profissional para adultos desempregados.', TRUE);

INSERT INTO opportunity (voluntaries_count, name, description, event_date, organization_id, open, active)
VALUES
(5, 'Evento de Arrecadação', 'Ajude a organizar um evento de arrecadação de fundos para a comunidade local.', '2024-12-10 14:00:00', 1, TRUE, TRUE),
(10, 'Distribuição de Alimentos', 'Participe na distribuição de alimentos para famílias em situação de vulnerabilidade.', '2024-11-25 09:00:00', 2, TRUE, TRUE),
(3, 'Atividades em Orfanato', 'Auxilie em atividades recreativas para crianças em orfanato.', '2024-12-01 10:00:00', 4, TRUE, TRUE),
(8, 'Campanha de Roupas', 'Colabore na campanha de doação de roupas para o inverno.', '2024-12-05 15:00:00', 8, TRUE, TRUE),
(7, 'Reflorestamento', 'Ajude no plantio de mudas para reflorestamento em áreas degradadas.', '2024-12-15 08:00:00', 7, TRUE, TRUE),
(4, 'Limpeza de Parque', 'Participe de uma ação de limpeza e conservação de um parque local.', '2024-11-30 09:00:00', 3, TRUE, TRUE),
(6, 'Oficina de Capacitação', 'Contribua em oficina de capacitação profissional para jovens.', '2024-12-20 13:00:00', 5, TRUE, TRUE),
(9, 'Atividades Culturais', 'Auxilie em atividades culturais em centro comunitário.', '2024-11-28 17:00:00', 8, TRUE, TRUE),
(5, 'Evento de Natal', 'Ajude na organização de evento beneficente de Natal.', '2024-12-22 11:00:00', 9, TRUE, TRUE),
(2, 'Conscientização de Saúde', 'Participe de campanha de conscientização sobre saúde mental.', '2024-12-18 14:30:00', 10, TRUE, TRUE);
