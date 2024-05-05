with (import <nixpkgs> {});
mkShell {
  buildInputs = with pkgs; [ bun ];
}
