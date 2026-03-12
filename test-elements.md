# 🏆 Octomark Test Suite :trophy:

Ceci est un fichier de test pour vérifier le rendu HTML et CSS.

---

## 1. Alertes (GitHub Beta Syntax)

> [!NOTE]
> Informations utiles que les utilisateurs devraient connaître.

> [!TIP]
> Conseils pour faire les choses mieux ou plus facilement.

> [!IMPORTANT]
> Informations cruciales pour réussir.

> [!WARNING]
> Informations urgentes nécessitant une attention immédiate.

> [!CAUTION]
> Conséquences négatives potentielles d'une action.

---

## 2. Formatage de texte

On peut écrire en **gras**, en _italique_, ou même ~~barré~~.
On peut aussi combiner **l'italique et le _gras_**.

Ici un lien vers [GitHub](https://github.com).

---

## 3. Listes et Tâches (Task Lists)

- [x] Créer le package npm
- [x] Ajouter le support TypeScript
- [ ] Dominer le monde du Markdown
- [ ] Boire un café ☕

**Liste ordonnée :**

1. Premier élément
2. Deuxième élément
   - Sous-élément
   - Autre sous-élément

---

## 4. Blocs de code (Syntax Highlighting)

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

console.log(greet({ id: 1, name: "Octomark" }));
```

### Rust

```rust
#[derive(Debug)]
struct Octomark {
    name: String,
    version: u32,
}

impl Octomark {
    fn new(name: &str) -> Self {
        Self {
            name: name.to_string(),
            version: 1,
        }
    }

    fn render(&self) -> Result<(), std::io::Error> {
        println!("🚀 Rendering {} v{}...", self.name, self.version);
        Ok(())
    }
}

fn main() {
    let app = Octomark::new("Octomark-CLI");
    if let Err(e) = app.render() {
        eprintln!("Error: {}", e);
    }
}
```
