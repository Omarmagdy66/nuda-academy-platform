using System.Security.Cryptography;
using System.Text;

namespace Services
{
    public class EncryptionService
    {
        private readonly byte[] _key = Encoding.UTF8.GetBytes("a-very-secret-key-that-is-long-enough"); // Replace with a secure key

        public string Encrypt(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
                return plainText;

            using (var aes = Aes.Create())
            {
                aes.Key = _key;
                aes.GenerateIV();
                var iv = aes.IV;
                var encryptor = aes.CreateEncryptor(aes.Key, iv);

                using (var ms = new System.IO.MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (var sw = new System.IO.StreamWriter(cs))
                        {
                            sw.Write(plainText);
                        }
                    }
                    var encryptedContent = ms.ToArray();
                    var result = new byte[iv.Length + encryptedContent.Length];
                    System.Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                    System.Buffer.BlockCopy(encryptedContent, 0, result, iv.Length, encryptedContent.Length);
                    return System.Convert.ToBase64String(result);
                }
            }
        }

        public string Decrypt(string cipherText)
        {
            if (string.IsNullOrEmpty(cipherText))
                return cipherText;

            var fullCipher = System.Convert.FromBase64String(cipherText);

            using (var aes = Aes.Create())
            {
                var iv = new byte[aes.BlockSize / 8];
                var cipher = new byte[fullCipher.Length - iv.Length];

                System.Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
                System.Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, cipher.Length);
                aes.Key = _key;
                aes.IV = iv;
                var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (var ms = new System.IO.MemoryStream(cipher))
                {
                    using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (var sr = new System.IO.StreamReader(cs))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
