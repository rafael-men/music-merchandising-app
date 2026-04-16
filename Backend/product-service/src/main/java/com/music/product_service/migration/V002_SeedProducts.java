package com.music.product_service.migration;

import com.music.product_service.models.Product;
import com.music.product_service.models.ProductCategory;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@ChangeUnit(id = "v002-seed-products", order = "002", author = "system")
public class V002_SeedProducts {

    @Execution
    public void execute(MongoTemplate mongoTemplate) {
        List<Product> products = List.of(
                new Product(null, "Rotting Christ - Pro Xristou (CD)",
                        "Mais recente álbum do lendário grupo grego Rotting Christ, mesclando black metal e atmosfera ritualística.",
                        89.90, null,
                        List.of(ProductCategory.BLACK_METAL, ProductCategory.CD, ProductCategory.NEW_ARRIVALS),
                        6, 25, true),

                new Product(null, "Mayhem - De Mysteriis Dom Sathanas (Vinyl)",
                        "Reedição em vinil do marco absoluto do black metal norueguês, lançado originalmente em 1994.",
                        249.90, null,
                        List.of(ProductCategory.BLACK_METAL, ProductCategory.VINYL, ProductCategory.UNDERGROUND),
                        10, 12, true),

                new Product(null, "Darkthrone - Transilvanian Hunger (CD)",
                        "Clássico cru e hipnótico do black metal de segunda onda. Edição remasterizada.",
                        79.90, null,
                        List.of(ProductCategory.BLACK_METAL, ProductCategory.CD),
                        4, 30, true),

                new Product(null, "Deicide - Legion (CD)",
                        "Álbum emblemático do death metal dos anos 90, com a agressividade inconfundível de Glen Benton.",
                        74.90, null,
                        List.of(ProductCategory.DEATH_METAL, ProductCategory.CD),
                        4, 18, true),

                new Product(null, "Cannibal Corpse - Tomb of the Mutilated (Vinyl)",
                        "Um dos álbuns mais brutais do death metal americano em edição especial em vinil.",
                        229.90, null,
                        List.of(ProductCategory.DEATH_METAL, ProductCategory.VINYL),
                        10, 8, true),

                new Product(null, "Morbid Angel - Altars of Madness (CD)",
                        "Debut histórico do death metal técnico. Considerado um dos melhores álbuns do gênero.",
                        84.90, null,
                        List.of(ProductCategory.DEATH_METAL, ProductCategory.CD, ProductCategory.DAILY_DEALS),
                        6, 22, true),

                new Product(null, "Death - Human (Vinyl)",
                        "Obra prima de Chuck Schuldiner, marco na transição entre death metal e death metal progressivo.",
                        279.90, null,
                        List.of(ProductCategory.DEATH_METAL, ProductCategory.PROG_METAL, ProductCategory.VINYL),
                        12, 10, true),

                new Product(null, "Lady Gaga - Mayhem (CD)",
                        "O mais novo lançamento de Lady Gaga, explorando estética dark pop e eletrônica.",
                        69.90, null,
                        List.of(ProductCategory.POP, ProductCategory.CD, ProductCategory.NEW_ARRIVALS, ProductCategory.INTERNATIONAL),
                        4, 50, true),

                new Product(null, "Taylor Swift - The Tortured Poets Department (Vinyl)",
                        "Álbum duplo em vinil com faixas exclusivas da edição de colecionador.",
                        319.90, null,
                        List.of(ProductCategory.POP, ProductCategory.VINYL, ProductCategory.INTERNATIONAL),
                        12, 20, true),

                new Product(null, "Billie Eilish - Hit Me Hard and Soft (CD)",
                        "Terceiro álbum de estúdio da cantora, com produção minimalista e letras introspectivas.",
                        64.90, null,
                        List.of(ProductCategory.POP, ProductCategory.CD, ProductCategory.INTERNATIONAL),
                        4, 35, true),

                new Product(null, "Deftones - Ohms (Vinyl)",
                        "Retorno poderoso da banda californiana, mesclando nu metal, shoegaze e atmosfera densa.",
                        259.90, null,
                        List.of(ProductCategory.NU_METAL, ProductCategory.ROCK, ProductCategory.VINYL),
                        10, 15, true),

                new Product(null, "Korn - Korn (CD)",
                        "Álbum de estreia que definiu o nu metal, lançado em 1994. Remasterizado.",
                        69.90, null,
                        List.of(ProductCategory.NU_METAL, ProductCategory.CD),
                        4, 28, true),

                new Product(null, "Slipknot - Iowa (Vinyl)",
                        "Segundo álbum do Slipknot, um dos mais agressivos e pesados da carreira da banda.",
                        269.90, null,
                        List.of(ProductCategory.NU_METAL, ProductCategory.HEAVY_METAL, ProductCategory.VINYL),
                        10, 14, true),

                new Product(null, "Mötley Crüe - Dr. Feelgood (CD)",
                        "Álbum que definiu o hard rock dos anos 80, agora em edição remasterizada.",
                        74.90, null,
                        List.of(ProductCategory.HARD_ROCK, ProductCategory.ROCK, ProductCategory.CD, ProductCategory.NEW_ARRIVALS),
                        4, 20, true),

                new Product(null, "Guns N' Roses - Appetite for Destruction (Vinyl)",
                        "Debut clássico do Guns N' Roses. Considerado um dos melhores álbuns de rock de todos os tempos.",
                        289.90, null,
                        List.of(ProductCategory.HARD_ROCK, ProductCategory.ROCK, ProductCategory.VINYL),
                        12, 18, true),

                new Product(null, "AC/DC - Back in Black (CD)",
                        "Um dos álbuns mais vendidos da história. Hard rock em sua forma mais pura.",
                        69.90, null,
                        List.of(ProductCategory.HARD_ROCK, ProductCategory.ROCK, ProductCategory.CD),
                        4, 40, true),

                new Product(null, "Iron Maiden - The Number of the Beast (Vinyl)",
                        "Clássico absoluto do heavy metal britânico em vinil colorido edição limitada.",
                        299.90, null,
                        List.of(ProductCategory.HEAVY_METAL, ProductCategory.VINYL),
                        12, 16, true),

                new Product(null, "Judas Priest - Painkiller (CD)",
                        "Álbum emblemático do heavy metal, conhecido pelos riffs velozes e vocais agudos de Rob Halford.",
                        72.90, null,
                        List.of(ProductCategory.HEAVY_METAL, ProductCategory.CD),
                        4, 24, true),

                new Product(null, "Black Sabbath - Paranoid (Vinyl)",
                        "O álbum que fundou o heavy metal. Reedição em vinil 180g.",
                        279.90, null,
                        List.of(ProductCategory.HEAVY_METAL, ProductCategory.HARD_ROCK, ProductCategory.VINYL),
                        10, 22, true),

                new Product(null, "Dream Theater - Metropolis Pt. 2: Scenes from a Memory (CD)",
                        "Ópera rock conceitual, um dos pilares do metal progressivo moderno.",
                        84.90, null,
                        List.of(ProductCategory.PROG_METAL, ProductCategory.CD),
                        6, 15, true),

                new Product(null, "Opeth - Blackwater Park (Vinyl)",
                        "Álbum seminal que mistura death metal progressivo e passagens acústicas introspectivas.",
                        269.90, null,
                        List.of(ProductCategory.PROG_METAL, ProductCategory.DEATH_METAL, ProductCategory.VINYL),
                        10, 12, true),

                new Product(null, "Tool - Lateralus (CD Duplo)",
                        "Álbum conceitual baseado na sequência de Fibonacci. Edição dupla com encarte expandido.",
                        94.90, null,
                        List.of(ProductCategory.PROG_METAL, ProductCategory.ROCK, ProductCategory.CD),
                        6, 20, true),

                new Product(null, "Mastodon - Crack the Skye (Vinyl)",
                        "Mastodon em sua vertente mais progressiva e psicodélica.",
                        249.90, null,
                        List.of(ProductCategory.SLUDGE_METAL, ProductCategory.PROG_METAL, ProductCategory.VINYL),
                        10, 10, true),

                new Product(null, "Eyehategod - Take as Needed for Pain (CD)",
                        "Referência do sludge metal de Nova Orleans, cru e visceral.",
                        79.90, null,
                        List.of(ProductCategory.SLUDGE_METAL, ProductCategory.UNDERGROUND, ProductCategory.CD),
                        4, 8, true),

                new Product(null, "Camarones Orquestra Guitarrística - Mundo Livre (CD)",
                        "Mistura de rock instrumental brasileiro com cordas e improvisação.",
                        54.90, null,
                        List.of(ProductCategory.BRAZILLIAN_MUSIC, ProductCategory.ROCK, ProductCategory.CD),
                        3, 15, true),

                new Product(null, "Chico Buarque - Construção (Vinyl)",
                        "Um dos álbuns mais importantes da MPB. Reedição em vinil com encarte original.",
                        219.90, null,
                        List.of(ProductCategory.BRAZILLIAN_MUSIC, ProductCategory.FOLK, ProductCategory.VINYL),
                        10, 18, true),

                new Product(null, "Daft Punk - Random Access Memories (Vinyl Duplo)",
                        "Vencedor do Grammy de Álbum do Ano. Edição dupla em vinil 180g.",
                        319.90, null,
                        List.of(ProductCategory.ELECTRONIC, ProductCategory.INTERNATIONAL, ProductCategory.VINYL),
                        12, 14, true),

                new Product(null, "Aphex Twin - Selected Ambient Works 85-92 (CD)",
                        "Clássico da música eletrônica ambiente e IDM britânico.",
                        79.90, null,
                        List.of(ProductCategory.ELECTRONIC, ProductCategory.UNDERGROUND, ProductCategory.CD),
                        4, 12, true),

                new Product(null, "Bob Dylan - Blood on the Tracks (Vinyl)",
                        "Álbum intimista e aclamado pela crítica. Folk em sua forma mais honesta.",
                        229.90, null,
                        List.of(ProductCategory.FOLK, ProductCategory.INTERNATIONAL, ProductCategory.VINYL),
                        10, 16, true),

                new Product(null, "Camiseta Oficial Iron Maiden - The Trooper",
                        "Camiseta oficial com estampa clássica do Iron Maiden. Algodão 100%, tamanhos P ao GG.",
                        89.90, null,
                        List.of(ProductCategory.OFFICIAL_MERCHANDISE, ProductCategory.HEAVY_METAL, ProductCategory.DAILY_DEALS),
                        4, 60, true)
        );

        mongoTemplate.insert(products, "products");
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.remove(new Query(), "products");
    }
}
