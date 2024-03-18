# 圧縮するディレクトリのパスを指定
DIRECTORY := .

# 圧縮品質を指定 (0-100)
QUALITY := 50

# 圧縮対象の拡張子を指定
EXTENSIONS := .png .webp .jpg .jpeg

# 圧縮コマンド
COMPRESS_CMD_PNG := optipng -o7 -strip all -out {}
COMPRESS_CMD_WEBP := cwebp -q $(QUALITY) {} -o {}
COMPRESS_CMD_JPEG := jpegoptim --strip-all --all-progressive -m$(QUALITY) {}

# デフォルトターゲット
all: compress_images

# 画像圧縮ターゲット
compress_images:
	find $(DIRECTORY) -type f \( -name "*.png" \) -exec $(COMPRESS_CMD_PNG) {} \;
	find $(DIRECTORY) -type f \( -name "*.webp" \) -exec $(COMPRESS_CMD_WEBP) \;
	find $(DIRECTORY) -type f \( -name "*.jpg" -o -name "*.jpeg" \) -exec $(COMPRESS_CMD_JPEG) {} \;

# クリーンターゲット
clean:
	@echo "Nothing to clean."

.PHONY: all compress_images clean
